import React from "react";
import Axios from "axios";
import Add from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import AllegianceList from "./AllegianceList";
import Search from "@material-ui/icons/Search";
import AllegianceDialog from "./AllegianceDialog";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import { User, Allegiance, FriendOrFo } from "../../../models";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

interface Props {
    allegiances: Allegiance[];
    clanId: number;
    updateAllegiances: (allegiances: Allegiance[]) => void;
    user: User;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            margin: theme.spacing(2, 0),
            width: "100%",
        },
    })
);
const AllegianceListShell: React.FC<Props> = (props) => {
    const [query, setQuery] = React.useState<string>("");
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const { allegiances, ...theRest } = props;
    const classes = useStyles();
    const handleAcceptAllegiance = (allegiance: Allegiance) => {
        Axios.put<Allegiance>(`/api/allegiance/${allegiance.id}/accept`, {
            ...allegiance,
            accepted: true,
            alliedOrNot: FriendOrFo.ALLY,
            pending: false,
        })
            .then((response) =>
                props.updateAllegiances(
                    allegiances.map((a) =>
                        a.id === allegiance.id ? response.data : a
                    )
                )
            )
            .catch((err) => console.log(err));
    };
    const handleDenyAllegiance = (allegiance: Allegiance) => {
        Axios.put<Allegiance>(`/api/allegiance/${allegiance.id}/deny`, {
            ...allegiance,
            accepted: false,
            alliedOrNot: FriendOrFo.ENEMY,
            pending: false,
        })
            .then((response) =>
                props.updateAllegiances(
                    allegiances.map((a) =>
                        a.id === allegiance.id ? response.data : a
                    )
                )
            )
            .catch((err) => console.log(err));
    };
    const handleMarkAsEnemy = (allegiance: Allegiance) => {
        Axios.put<Allegiance>(`/api/allegiance/${allegiance.id}/markAsEnemy`, {
            ...allegiance,
            accepted: false,
            alliedOrNot: FriendOrFo.ENEMY,
            pending: false,
        })
            .then((response) =>
                props.updateAllegiances(
                    allegiances.map((a) =>
                        a.id === allegiance.id ? response.data : a
                    )
                )
            )
            .catch((err) => console.log(err));
    };
    const handleRequestAllegiance = (otherClanId: number, type: FriendOrFo) => {
        setDialogOpen(false);
        Axios.post<Allegiance>(`/api/allegiance/new`, {
            accepted: false,
            alliedOrNot: type,
            clanId: props.clanId,
            clanId_2: otherClanId,
            pending: true,
        })
            .then((response) =>
                props.updateAllegiances([...allegiances, response.data])
            )
            .catch((err) => console.log(err));
    };

    const handleOpen = () => {
        setDialogOpen(true);
    };
    const handleClose = () => {
        setDialogOpen(false);
    };
    return (
        <>
            <AllegianceDialog
                close={handleClose}
                isOpen={dialogOpen}
                clanId={props.clanId}
                allegiances={allegiances}
                submit={handleRequestAllegiance}
            />
            <Grid
                container
                direction="row"
                wrap="nowrap"
                justify="space-between"
            >
                <Grid item>
                    <Typography color="textPrimary" variant="h3">
                        Allegiances
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleOpen} color="secondary">
                        <Add />
                    </IconButton>
                </Grid>
            </Grid>
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
            <AllegianceList
                acceptAllegiance={handleAcceptAllegiance}
                denyAllegiance={handleDenyAllegiance}
                markAsEnemy={handleMarkAsEnemy}
                allegiances={allegiances.filter((a) =>
                    a.otherClan.name.includes(query)
                )}
                {...theRest}
            />
        </>
    );
};

export default AllegianceListShell;
