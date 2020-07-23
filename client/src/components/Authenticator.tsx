import * as UserActions from "../store/user/user.actions";
import * as fromUser from "../store/user";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

const Authenticator: React.FC = ({ children }) => {
  const isAuthenticated = useSelector(fromUser.selectIsAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    if (!isAuthenticated) {
      dispatch(UserActions.checkAuth(history));
    }
  }, [isAuthenticated, dispatch]);
  return <>{children}</>;
};

export default Authenticator;
