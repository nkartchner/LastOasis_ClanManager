import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUserName } from "../store/user";
import { Link } from "react-router-dom";
import { ApplicationPaths } from "./api-authorization/ApiAuthConstants";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        color: theme.palette.text.primary,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
}));

const Home: React.FC = () => {
    const classes = useStyles();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const usersName = useSelector(selectUserName);
    return (
        <div className={classes.root}>
            <h1>Welcome {usersName ? usersName : "Guest"}!</h1>
            <p>
                Welcome to the clan manager for Oasis. Here you can create and
                manage your clans events, members, updates, etc...
            </p>
            <ul>
                <li>Create and manage clans using the Clan Dashboard</li>
                <li>
                    Post blog updates, images, and even link videos on recent
                    clan adventures
                </li>
                <li>Create and manage/view upcoming clan events</li>
                <li>Chat with other online clan members</li>
                <li>Obtain real-time status updates</li>
                <li>And more to come...</li>
            </ul>

            {isAuthenticated ? (
                <p>You can start by searching for clans below</p>
            ) : (
                <p>
                    To get started, you can register{" "}
                    <Link to={ApplicationPaths.Register}>Here</Link>
                </p>
            )}
        </div>
    );
};

export default Home;
