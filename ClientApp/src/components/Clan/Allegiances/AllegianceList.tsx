import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import { Allegiance, User } from "../../../models";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: "100%",
    },
    container: {
        display: "flex",
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
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
    pending: {
        color: theme.palette.secondary.main
    },
    denied: {
        color: theme.palette.warning.main
    },
    allied: {
        color: theme.palette.success.main
    }
}));

interface Props {
    allegiances: Allegiance[];
    clanId: number;
    acceptAllegiance: (allegiance: Allegiance) => void;
    denyAllegiance: (allegiance: Allegiance) => void;
    markAsEnemy: (allegiance: Allegiance) => void;
    user: User;
}

const AllegianceList: React.FC<Props> = ({ allegiances, clanId, user }) => {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Clan Name</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allegiances
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((allegiance) => {
                                return (
                                    <TableRow key={allegiance.id}>
                                        <TableCell>
                                            {allegiance.otherClan.name}
                                        </TableCell>
                                        <TableCell>
                                            {allegiance.pending ? (
                                                <span
                                                    className={classes.pending}
                                                >
                                                    Pending
                                                </span>
                                            ) : allegiance.alliedOrNot ? (
                                                <span
                                                    className={classes.allied}
                                                >
                                                    Ally
                                                </span>
                                            ) : (
                                                        <span className={classes.denied}>
                                                            Enemy
                                                        </span>
                                                    )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={allegiances.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default AllegianceList;
