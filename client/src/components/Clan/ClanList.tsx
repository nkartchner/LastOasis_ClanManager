import React from "react";
import Axios from "axios";
import { Clan } from "../../models";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import { RouteComponentProps } from "react-router";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
});

const ClanList: React.FC<RouteComponentProps> = ({ history }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [clans, setClans] = React.useState<Clan[]>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    React.useEffect(() => {
        Axios.get<Clan[]>("/api/Clan/All")
            .then((response) => setClans(response.data))
            .catch((err) =>
                console.log("Something went wrong when getting the clans", err)
            );
    }, []);

    const handleRedirect = (clanId: number) => () => {
        history.push(`/clans/${clanId}`);
    };

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
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead color="primary">
                        <TableRow>
                            <TableCell style={{ minWidth: 170 }}>
                                Name
                            </TableCell>
                            <TableCell style={{ minWidth: 170 }}>
                                Members
                            </TableCell>
                            <TableCell style={{ minWidth: 170 }}>
                                Allegiances
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clans
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((clan) => {
                                return (
                                    <TableRow
                                        hover
                                        onClick={handleRedirect(clan.id)}
                                        role="checkbox"
                                        style={{ backgroundColor: clan.color }}
                                        tabIndex={-1}
                                        key={clan.id}
                                    >
                                        <TableCell>{clan.name}</TableCell>
                                        <TableCell>
                                            {clan.members.length}
                                        </TableCell>
                                        <TableCell align="right">
                                            {clan.allegiances.length}
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
                count={clans.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ClanList;
