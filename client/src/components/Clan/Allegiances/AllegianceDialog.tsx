import React from "react";
import Axios from "axios";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TableContainer from "@material-ui/core/TableContainer";
import { FriendOrFo, Clan, Allegiance } from "../../../models";

interface Props {
    clanId: number;
    isOpen: boolean;
    close: () => void;
    allegiances: Allegiance[];
    submit: (otherClanId: number, type: FriendOrFo) => void;
}

const AllegianceDialog: React.FC<Props> = ({
    isOpen,
    submit,
    close,
    clanId,
    allegiances,
}) => {
    const [query, setQuery] = React.useState<string>("");
    const [clans, setClans] = React.useState<Clan[]>([]);
    React.useEffect(() => {
        if (isOpen) {
            Axios.get<Clan[]>("/api/clan/all")
                .then((response) => setClans(response.data))
                .catch((err) => console.log(err));
        }
    }, [isOpen]);

    return (
        <Dialog
            open={isOpen}
            onClose={close}
            fullWidth
            maxWidth="md"
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Search for clan</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    multiline
                    style={{ margin: "16px 0" }}
                    color="primary"
                    onChange={(e) => setQuery(e.target.value)}
                    id="name"
                    label="Search by Clan name..."
                    type="text"
                    fullWidth
                />
                <TableContainer>
                    <Table stickyHeader aria-label="list of clans">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clans
                                .filter(
                                    (c) =>
                                        c.name
                                            .toLowerCase()
                                            .includes(query.toLowerCase()) &&
                                        c.id !== clanId &&
                                        allegiances.findIndex(
                                            (a) => a.clanId_2 === c.id
                                        ) === -1
                                )
                                .map((clan) => (
                                    <TableRow key={clan.id}>
                                        <TableCell>{clan.name}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                style={{ margin: "0 5px" }}
                                                color="primary"
                                                onClick={() =>
                                                    submit(
                                                        clan.id,
                                                        FriendOrFo.ALLY
                                                    )
                                                }
                                            >
                                                Ally
                                            </Button>
                                            <Button
                                                variant="contained"
                                                style={{ margin: "0 5px" }}
                                                color="secondary"
                                                onClick={() =>
                                                    submit(
                                                        clan.id,
                                                        FriendOrFo.ENEMY
                                                    )
                                                }
                                            >
                                                Enemy
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AllegianceDialog;
