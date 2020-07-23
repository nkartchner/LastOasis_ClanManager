import React from "react";
import { User } from "../../../models";
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
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

type Role = "Founder" | "Leader" | "Member" | "Officer";
const ROLES: Role[] = ["Founder", "Leader", "Member", "Officer"];
const useStyles = makeStyles((theme) => ({
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
  nestedMenu: {
    transformOrigin: "150px 0 0 0",
  },
  menu: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    minWidth: 150,
    minHeight: 16,
    display: "flex",
    flexDirection: "column",
    borderRadius: 4,
    maxHeight: "calc(100% - 96px)",
    WebkitOverflowScrolling: "touch",
    overflowX: "hidden",
    overflowY: "auto",
    transition:
      "opacity 251ms cubic-bezier(0.4,0,0.2,1) 0ms, transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow:
      "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
  },
  menuitem: {
    backgroundColor: "inherit",
    border: "none",
    color: theme.palette.text.primary,
    overflow: "hidden",
    padding: theme.spacing(1, 2),
    minHeight: "auto",
    lineHeight: 1.5,
    fontWeight: 400,
    fontSize: "1rem",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    width: "auto",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  hover: {
    backgroundColor: theme.palette.action.hover,
  },
}));
interface MenuProps {
  currentUserRole: Role;
  anchorEl: HTMLElement;
  handleClose: () => void;
  handleRemove: () => void;
  changeRole: (role: Role) => void;
}

const SimpleMenu: React.FC<MenuProps> = ({
  anchorEl,
  handleClose,
  changeRole,
  currentUserRole,
  handleRemove,
}) => {
  const classes = useStyles();
  const [nestedEl, setNestedEl] = React.useState<HTMLElement | null>(null);
  const [left, setLeft] = React.useState<number>(0);
  const [top, setTop] = React.useState<number>(0);

  const openNested = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLeft(rect.x + rect.width);
    setTop(rect.top - 6);
    setNestedEl(e.currentTarget);
  };
  const closeNested = () => {
    setNestedEl(null);
  };

  const handleChangeRole = (role: Role) => () => {
    changeRole(role);
    handleClose();
    closeNested();
  };

  const remove = () => {
    handleRemove();
    handleClose();
    closeNested();
  };
  const log = (e: any) => {
    e.addEventListener("mouseleave", closeNested, { once: true });
  };
  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          className={Boolean(nestedEl) ? classes.hover : ""}
          onMouseEnter={openNested}
          onClick={handleClose}
        >
          Role <ArrowRightIcon />
        </MenuItem>

        <MenuItem onClick={remove}>Remove</MenuItem>
      </Menu>
      <Menu
        id="role-menu"
        onEnter={log}
        anchorReference="anchorPosition"
        anchorPosition={{ left, top }}
        className={classes.nestedMenu}
        open={Boolean(nestedEl)}
        onClose={closeNested}
      >
        {ROLES.map((role) => (
          <MenuItem key={role} onClick={handleChangeRole(role)}>
            {role} {currentUserRole === role && " (Current)"}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
interface Column {
  id: keyof User | "actions";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "firstName", label: "First Name", minWidth: 100 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  {
    id: "role",
    label: "Role",
    minWidth: 100,
    align: "right",
  },
];
const adminColumn: Column = {
  id: "actions",
  label: "",
  minWidth: 0,
  align: "right",
};

interface Props {
  users: User[];
  isAdmin: boolean;
  handleRoleChange: (role: string, userId: number) => void;
  handleRemoveMember: (userId: number) => void;
}

const MembersList: React.FC<Props> = ({
  users,
  isAdmin,
  handleRoleChange,
  handleRemoveMember,
}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpen = (user: User) => (event: React.MouseEvent<HTMLElement>) => {
    setSelectedUser(user);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const changeRole = (role: string) => {
    if (selectedUser) handleRoleChange(role, selectedUser.id);
  };

  const handleRemove = () => {
    if (selectedUser) handleRemoveMember(selectedUser.id);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {(isAdmin ? [...columns, adminColumn] : columns).map((column) => (
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
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                  {(isAdmin ? [...columns, adminColumn] : columns).map(
                    (column) => {
                      let value;
                      if (column.id !== "actions") {
                        value = user[column.id];
                      } else {
                        value = (
                          <IconButton onClick={handleOpen(user)}>
                            <MenuIcon />
                          </IconButton>
                        );
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {selectedUser && anchorEl && (
          <SimpleMenu
            changeRole={changeRole}
            handleRemove={handleRemove}
            anchorEl={anchorEl}
            currentUserRole={selectedUser.role as Role}
            handleClose={handleClose}
          />
        )}
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
    </Paper>
  );
};

export default MembersList;
