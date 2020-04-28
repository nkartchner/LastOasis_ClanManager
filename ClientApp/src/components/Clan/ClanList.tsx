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

interface Column {
    id: keyof Clan;
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "color", label: "Color", minWidth: 100 },
    {
        id: "members",
        label: "Members",
        minWidth: 170,
        align: "right",
    },
    {
        id: "allegiances",
        label: "Allegiances",
        minWidth: 170,
        align: "right",
    },
];

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
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
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
                                        tabIndex={-1}
                                        key={clan.id}
                                    >
                                        {columns.map((column) => {
                                            const value = clan[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {Array.isArray(value)
                                                        ? `${value.length}`
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
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
