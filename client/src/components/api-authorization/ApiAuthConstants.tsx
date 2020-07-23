export const ApplicationName = "ClanManager";

export type QueryParamNameTypes = "returnUrl" | "message";
export const QueryParameterNames: { [key: string]: QueryParamNameTypes } = {
  ReturnUrl: "returnUrl",
  Message: "message",
};
export type LogoutActionTypes = "logout-callback" | "logout" | "logged-out";
export const LogoutActions: { [key: string]: LogoutActionTypes } = {
  LogoutCallback: "logout-callback",
  Logout: "logout",
  LoggedOut: "logged-out",
};

export type LoginActionTypes =
  | "login"
  | "login-callback"
  | "login-failed"
  | "profile"
  | "register";

export const LoginActions: { [key: string]: LoginActionTypes } = {
  Login: "login",
  LoginCallback: "login-callback",
  LoginFailed: "login-failed",
  Profile: "profile",
  Register: "register",
};

const prefix = "/authentication";

export const ApplicationPaths = {
  DefaultLoginRedirectPath: "/dashboard",
  ApiAuthClientConfigurationUrl: `/_configuration/${ApplicationName}`,
  ApiAuthPrefix: prefix,
  Login: `${prefix}/${LoginActions.Login}`,
  LoginFailed: `${prefix}/${LoginActions.LoginFailed}`,
  LoginCallback: `${prefix}/${LoginActions.LoginCallback}`,
  Register: `${prefix}/${LoginActions.Register}`,
  Profile: `${prefix}/${LoginActions.Profile}`,
  LogOut: `${prefix}/${LogoutActions.Logout}`,
  LoggedOut: `${prefix}/${LogoutActions.LoggedOut}`,
  LogOutCallback: `${prefix}/${LogoutActions.LogoutCallback}`,
  IdentityRegisterPath: "/Identity/Account/Register",
  IdentityManagePath: "/Identity/Account/Manage",
  GetFullUserPath: `${prefix}/user`,
};
