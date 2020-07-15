import {
    selectIsAuthenticated,
    actionCreators as UserActions,
} from "../store/user";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Authenticator: React.FC = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (!isAuthenticated) {
            dispatch(UserActions.checkAuth());
        }
    }, [isAuthenticated, dispatch]);
    return <>{children}</>;
};

export default Authenticator;
