import {
    selectClanId,
    selectUserName,
    actionCreators,
    selectIsAuthenticated,
} from "../store/user";
import clsx from "clsx";
import React from "react";
import NavMenu from "./NavMenu";
import MainRouter from "./MainRouter";
import SidenavMenu from "./SidenavMenu";
import { useHistory } from "react-router";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import LoginMenu from "./api-authorization/LoginMenu";
import { useSelector, useDispatch } from "react-redux";
import { Toolbar, AppBar, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: "flex",
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(10, 3, 3, 3),
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        list: {
            width: drawerWidth,
        },
        fullList: {
            width: "auto",
        },
        sidenavContainer: {
            display: "flex",
            minHeight: "100%",
            backgroundColor: theme.palette.background.default,
        },
        sidenavContent: {
            padding: 10,
            flexGrow: 1,
        },
        rotateOpen: {
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.short,
            }),
            transform: "rotate(90deg)",
        },
        rotateClose: {
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.short,
            }),
            transform: "rotate(0deg)",
        },
        nestedIcon: {
            minWidth: "unset",
        },
    })
);
const drawerWidth = 240;

const Sidenav = () => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = React.useState<boolean>(true);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userName = useSelector(selectUserName);
    const clanId = useSelector(selectClanId);
    const dispatch = useDispatch();
    const history = useHistory();
    const redirectTo = (url: string) => () => {
        history.push(url);
    };

    const handleLogout = () => {
        dispatch(actionCreators.logout());
    };

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        setIsOpen(open);
    };

    const authenticatedList = (
        <List>
            <SidenavMenu clanId={clanId} redirectTo={redirectTo} />
        </List>
    );

    return (
        <div className={classes.sidenavContainer}>
            <NavMenu toggleDrawer={toggleDrawer} isOpen={isOpen} />
            <Drawer
                className={classes.drawer}
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
                open={isOpen}
                variant="persistent"
                onClose={toggleDrawer(false)}
            >
                <div className={classes.list} role="presentation">
                    <div className={classes.drawerHeader}>
                        <AppBar position="relative" color="transparent">
                            <Toolbar>
                                <Typography variant="h6" color="textPrimary">
                                    {isAuthenticated && userName
                                        ? userName
                                        : "Navigation"}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <List>
                        {isAuthenticated && authenticatedList}
                        <LoginMenu
                            isAuthenticated={isAuthenticated}
                            logout={handleLogout}
                            redirectTo={redirectTo}
                        />
                    </List>
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: isOpen,
                })}
            >
                <MainRouter />
            </main>
        </div>
    );
};
export default Sidenav;
