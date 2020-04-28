using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;

namespace ClanManager.Controllers.Authorization
{

    public class ClanManagerAuth : Attribute, IAuthorizationFilter
    {

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            try
            {
                string authHeader = context.HttpContext.Request.Headers["Authorization"];
                if (authHeader != null)
                {
                    JwtSecurityTokenHandler Jwt = new JwtSecurityTokenHandler();
                    JwtSecurityToken Token = Jwt.ReadJwtToken(authHeader.Split(" ")[1]);
                    ClaimsPrincipal Principal = context.HttpContext.User;
                    Claim Claim = Principal.Claims.Where(c => c.Type == ClaimTypes.Name).Single();
                    int UserId = Int32.Parse(Claim.Value);
                    bool TokenExpired = Token.ValidTo.CompareTo(Token.ValidFrom) < 1;
                    bool result = IsAuthorized(context);

                    if (!TokenExpired && result) return;
                    if (!TokenExpired && !result)
                    {
                        context.HttpContext.Session.SetInt32("UserId", UserId);
                        return;
                    }
                    System.Console.WriteLine("On Auth Failure! is it expired? {0}; are we authorized? {1}", TokenExpired, result);
                }
                else
                {
                    System.Console.WriteLine("Don't have an auth header apparently", authHeader);
                    ReturnUnauthorizedResult(context);
                }
            }
            catch (FormatException)
            {
                ReturnUnauthorizedResult(context);
            }
        }
        public bool IsAuthorized(AuthorizationFilterContext context)
        {
            return context.HttpContext.Session.GetInt32("UserId") != null;
        }

        private void ReturnUnauthorizedResult(AuthorizationFilterContext context)
        {
            context.Result = new UnauthorizedResult();
        }
    }
}