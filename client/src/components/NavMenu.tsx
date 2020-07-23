import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import "./NavMenu";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    toolbar: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-end",
    },

    appBar: {
      gridRow: 1,
      gridColumn: 2,
    },
  })
);

interface NavProps {
  toggleDrawer: (open: boolean) => any;
  isOpen: boolean;
}

const NavMenu: React.FC<NavProps> = ({ toggleDrawer, isOpen }) => {
  const classes = useStyles();
  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h6" noWrap>
          Clan Manager
        </Typography>
        <div className={classes.grow} />
        <IconButton
          className={classes.menuButton}
          onClick={toggleDrawer(!isOpen)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavMenu;
