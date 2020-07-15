import React from "react";
import Axios from "axios";
import RequestList from "./RequestList";
import Search from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { RequestToJoin, User } from "../../../models";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

interface Props {
    requests: RequestToJoin[];
    clanId: number;
    user: User;
    updateRequests: (requests: RequestToJoin[]) => void;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            margin: theme.spacing(2, 0),
            width: "100%",
        },
    })
);
const RequestListShell: React.FC<Props> = (props) => {
    const [query, setQuery] = React.useState<string>("");
    const { updateRequests, requests, user, clanId } = props;
    const classes = useStyles();

    const handleAcceptRequest = (request: RequestToJoin) => {
        Axios.post(`/api/clan/${request.id}/accept`, null)
            .then(() => {
                updateRequests(requests.filter((req) => req.id !== request.id));
            })
            .catch((err) => console.log(err));
    };

    const handleDenyRequest = (request: RequestToJoin) => {
        Axios.delete(`/api/clan/${request.id}/deny`)
            .then(() => {
                updateRequests(requests.filter((req) => req.id !== request.id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <TextField
                className={classes.field}
                value={query}
                variant="standard"
                color="primary"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => setQuery(e.target.value)}
            />
            <RequestList
                requests={requests.filter((r) =>
                    `${r.user.firstName} ${r.user.lastName}`.includes(query)
                )}
                acceptRequest={handleAcceptRequest}
                user={user}
                clanId={clanId}
                denyRequest={handleDenyRequest}
            />
        </>
    );
};

export default RequestListShell;
