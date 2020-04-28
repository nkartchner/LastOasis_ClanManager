import React from "react";
import Home from "./Home";
import ClanList from "./Clan/ClanList";
import ClanDetails from "./Clan/ClanDetails";
import NewClanForm from "./Clan/NewClanForm";
import Dashboard from "./Dashboard/Dashboard";
import LoginPage from "./api-authorization/LoginPage";
import { Route, Switch, Redirect } from "react-router";
import AuthRoute from "./api-authorization/AuthRoutes";
import Register from "./api-authorization/RegisterPage";
import UserListRouteShell from "./User/UserListRouteShell";
import Profile from "./User/Profile";

const MainRouter = () => {
    return (
        <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginPage} />
            <AuthRoute path="/dashboard" component={Dashboard} />
            <AuthRoute path="/clans/new" component={NewClanForm} />
            <AuthRoute path="/profile" component={Profile} />
            <AuthRoute path="/clans/:clanId" component={ClanDetails} />
            <AuthRoute path="/clans" component={ClanList} />
            <AuthRoute path="/users" component={UserListRouteShell} />
            <Redirect to="/login" />
        </Switch>
    );
};

export default MainRouter;
