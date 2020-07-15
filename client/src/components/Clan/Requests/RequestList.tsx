import React from "react";
import Timeago from "react-timeago";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import { RequestToJoin, User } from "../../../models";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

interface Column {
    id: keyof RequestToJoin | "actions";
    label: string;
    minWidth?: number;
    align?: "right";
}

const columns: Column[] = [
    { id: "user", label: "Users Name", minWidth: 170 },
    { id: "reason", label: "Reason", minWidth: 100 },
    {
        id: "createdAt",
        label: "Submitted",
        minWidth: 170,
        align: "right",
    },
];
const adminColumns: Column[] = [
    { id: "user", label: "Users Name", minWidth: 170 },
    { id: "reason", label: "Reason", minWidth: 100 },
    {
        id: "createdAt",
        label: "Submitted",
        minWidth: 170,
    },
    { id: "actions", label: "Actions", minWidth: 170, align: "right" },
];
const useStyles = makeStyles((theme) => ({
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
}));

interface Props {
    requests: RequestToJoin[];
    clanId: number;
    acceptRequest: (request: RequestToJoin) => any;
    denyRequest: (request: RequestToJoin) => any;
    user: User;
}

const RequestList: React.FC<Props> = ({
    requests,
    clanId,
    user,
    acceptRequest,
    denyRequest,
}) => {
    const classes = useStyles();
    const isFounder = user.clanId === clanId && user.role.includes("Founder");

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
                            {isFounder
                                ? adminColumns.map((column) => (
                                      <TableCell
                                          key={column.id}
                                          align={column.align}
                                          style={{ minWidth: column.minWidth }}
                                      >
                                          {column.label}
                                      </TableCell>
                                  ))
                                : columns.map((column) => (
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
                        {requests
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((request) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={request.id}
                                    >
                                        <TableCell>
                                            {request.user.firstName}{" "}
                                            {request.user.lastName}
                                        </TableCell>
                                        <TableCell>{request.reason}</TableCell>
                                        <TableCell
                                            align={
                                                isFounder ? "inherit" : "right"
                                            }
                                        >
                                            <Timeago
                                                date={new Date(
                                                    request.createdAt
                                                ).valueOf()}
                                            />
                                        </TableCell>
                                        {isFounder && (
                                            <TableCell align="right">
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        acceptRequest(request)
                                                    }
                                                    color="primary"
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        denyRequest(request)
                                                    }
                                                    color="secondary"
                                                >
                                                    Deny
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={requests ? requests.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default RequestList;
