import Home from "./Home";
import React from "react";
import Profile from "./User/Profile";
import ClanNav from "./Clan/ClanNav";
import ClanList from "./Clan/ClanList";
import NewClanForm from "./Clan/NewClanForm";
import LoginPage from "./api-authorization/LoginPage";
import { Route, Switch, Redirect } from "react-router";
import AuthRoute from "./api-authorization/AuthRoutes";
import Register from "./api-authorization/RegisterPage";
import UserListRouteShell from "./User/UserListRouteShell";
// import TechTree from "./TechTree/TechTree";
import TechTreeKonva from "./TechTree/TechTreeKonva";

const MainRouter = () => {
    return (
        <Switch>
            <AuthRoute path="/users" component={UserListRouteShell} />
            <AuthRoute path="/clans/new" component={NewClanForm} />
            <AuthRoute path="/clans/:clanId" component={ClanNav} />
            <AuthRoute path="/profile" component={Profile} />
            <AuthRoute path="/clans" component={ClanList} />
            <AuthRoute path="/dashboard" component={Home} />
            <AuthRoute path="/techtree" component={TechTreeKonva} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginPage} />
            <Redirect to="/login" />
        </Switch>
    );
};

export default MainRouter;
