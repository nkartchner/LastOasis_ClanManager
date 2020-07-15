import React from "react";
import { User } from "../../models";
import Menu from "@material-ui/core/Menu";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

interface Column {
    id: keyof User | "actions";
    label: string;
    minWidth?: number;
    align?: "right";
}

const columns: Column[] = [
    { id: "firstName", label: "First Name", minWidth: 170 },
    { id: "lastName", label: "Last Name", minWidth: 100 },
    {
        id: "role",
        label: "Role",
        minWidth: 170,
        align: "right",
    },
    { id: "actions", label: "Actions", minWidth: 50, align: "right" },
];
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

interface Props {
    users: User[];
}

const AdminMembersList: React.FC<Props> = ({ users }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(e.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
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
                        {users &&
                            users
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((user) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={user.id}
                                        >
                                            {columns.map((column) => {
                                                let value;
                                                if (column.id !== "actions")
                                                    value = user[column.id];
                                                else {
                                                    value = (
                                                        <IconButton
                                                            onClick={handleOpen}
                                                        >
                                                            <MenuIcon />
                                                        </IconButton>
                                                    );
                                                }

                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {value}
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
                count={users ? users.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <Menu open={Boolean(anchor)} anchorEl={anchor}>
                <MenuItem></MenuItem>
            </Menu>
        </Paper>
    );
};

export default AdminMembersList;
