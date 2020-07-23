import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { selectIsAuthenticated } from "../../store/user";
import { ApplicationPaths, QueryParameterNames } from "./ApiAuthConstants";

const AuthorizeRoute: React.FC<RouteProps & { component: React.FC<any> }> = (
  props
) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const redirectUrl = `${ApplicationPaths.Login}?${
    QueryParameterNames.ReturnUrl
  }=${encodeURI(window.location.href)}`;

  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to={redirectUrl} />;
        }
      }}
    />
  );
};

export default AuthorizeRoute;
