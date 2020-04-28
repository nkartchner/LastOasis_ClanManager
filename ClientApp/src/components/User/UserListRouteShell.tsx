import React from "react";
import Axios from "axios";
import UserList from "./UserList";
import { User } from "../../models";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
    },
    container: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    table: {
        width: "100%",
        textAlign: "center",
    },
    spinner: {
        margin: "0 auto",
    },
    loadingTxt: {
        textAlign: "center",
    },
}));

const UserListRouteShell = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [users, setUsers] = React.useState<User[] | null>(null);
    React.useEffect(() => {
        Axios.get<User[]>("api/User/All")
            .then((response) => {
                setUsers(response.data);
                setIsLoading(false);
            })
            .catch((err) =>
                console.log(
                    "Something went wrong getting our hands on the users",
                    err
                )
            );
    }, []);
    return (
        <div className={classes.root}>
            {isLoading || !users ? (
                <div className={classes.container}>
                    <div>
                        <CircularProgress
                            className={classes.spinner}
                            size={100}
                            color="secondary"
                        />
                    </div>
                    <p className={classes.loadingTxt}>...Loading</p>
                </div>
            ) : (
                <UserList users={users} />
            )}
        </div>
    );
};

export default UserListRouteShell;
