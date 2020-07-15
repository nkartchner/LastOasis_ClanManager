import React from "react";
import Person from "@material-ui/icons/Person";
import ListItem from "@material-ui/core/ListItem";
import PersonAdd from "@material-ui/icons/PersonAdd";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
type Props = {
    redirectTo: (url: string) => () => any;
    logout: () => any;
    isAuthenticated: boolean;
};

const LoginMenu: React.FC<Props> = (props) => {
    const { isAuthenticated, redirectTo, logout } = props;

    const authenticatedView = () => (
        <>
            <ListItem button onClick={redirectTo("/profile")}>
                <ListItemIcon>
                    <Person />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={logout}>
                <ListItemIcon>
                    <PowerSettingsNew />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </>
    );

    const anonymousView = () => {
        return (
            <>
                <ListItem button onClick={redirectTo("/register")}>
                    <ListItemIcon>
                        <PersonAdd />
                    </ListItemIcon>
                    <ListItemText primary="Register" />
                </ListItem>
                <ListItem button onClick={redirectTo("/login")}>
                    <ListItemIcon>
                        <PowerSettingsNew />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                </ListItem>
            </>
        );
    };

    if (!isAuthenticated) {
        return anonymousView();
    } else {
        return authenticatedView();
    }
};
export default LoginMenu;
