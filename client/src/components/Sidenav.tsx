import clsx from "clsx";
import React from "react";
import NavMenu from "./NavMenu";
import MainRouter from "./MainRouter";
import SidenavMenu from "./SidenavMenu";
import { useHistory } from "react-router";
import List from "@material-ui/core/List";
import LoginMenu from "./api-authorization/LoginMenu";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import * as fromUser from "../store/user";
import * as UserActions from "../store/user/user.actions";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    drawer: {
      gridRow: "1 / 3",
      gridColumn: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper,
    },
    drawerHeader: {
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
      ...theme.typography.h6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 64,
      whiteSpace: "nowrap",
    },
    content: {
      position: "relative",
      gridRow: 2,
      gridColumn: 2,
    },
    list: {
      whiteSpace: "nowrap",
    },

    sidenavContainer: {
      display: "grid",
      height: "100%",
      width: "100%",
      transition: "0.1s",
      gridTemplateColumns: "240px calc(100% - 240px)",
      gridTemplateRows: "64px calc(100% - 64px)",
      position: "relative",
      backgroundColor: theme.palette.background.default,
      "& > *": {
        color: theme.palette.text.primary,
      },
      "&.closed": {
        gridTemplateColumns: "0px 100%",
      },
    },
  })
);

const Sidenav = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const isAuthenticated = useSelector(fromUser.selectIsAuthenticated);
  const userName = useSelector(fromUser.selectUserName);
  const clanId = useSelector(fromUser.selectClanId);
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = (url: string) => () => {
    history.push(url);
  };

  const handleLogout = () => {
    dispatch(UserActions.logout(history));
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
    <SidenavMenu clanId={clanId} redirectTo={redirectTo} />
  );

  return (
    <div className={clsx(classes.sidenavContainer, { closed: !isOpen })}>
      <NavMenu toggleDrawer={toggleDrawer} isOpen={isOpen} />
      <div className={classes.drawer}>
        <div className={classes.drawerHeader}>
          {isAuthenticated && userName ? userName : "Navigation"}
        </div>

        {isOpen && (
          <List className={classes.list}>
            {isAuthenticated && authenticatedList}
            <LoginMenu
              isAuthenticated={isAuthenticated}
              logout={handleLogout}
              redirectTo={redirectTo}
            />
          </List>
        )}
      </div>
      <main className={classes.content}>
        <MainRouter />
      </main>
    </div>
  );
};
export default Sidenav;
