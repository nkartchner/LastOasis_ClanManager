import React from "react";
import Axios from "axios";
import { User } from "../../../models";
import MembersList from "./MembersList";
import Search from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

interface Props {
  users: User[];
  isAdmin: boolean;
  updateMembers: (members: User[]) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      margin: theme.spacing(2, 0),
      width: "100%",
    },
  })
);

const MembersListShell: React.FC<Props> = (props) => {
  const { updateMembers, users, ...theRest } = props;
  const [query, setQuery] = React.useState<string>("");
  const classes = useStyles();

  const handleRoleChange = (role: string, userId: number) => {
    console.log("Changing current users role");
    Axios.put(`/api/user/${userId}/updaterole`, { role })
      .then(() => {
        updateMembers(users.map((u) => (u.id === userId ? { ...u, role } : u)));
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveUser = (userId: number) => {
    console.log("Removing user from clan");
    Axios.put(`/api/user/${userId}/removeclan`, null)
      .then(() => {
        updateMembers(users.filter((u) => u.id !== userId));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TextField
        className={classes.field}
        value={query}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        color="primary"
      />
      <MembersList
        handleRoleChange={handleRoleChange}
        handleRemoveMember={handleRemoveUser}
        users={users.filter((u) =>
          `${u.firstName} ${u.lastName}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )}
        {...theRest}
      />
    </>
  );
};

export default MembersListShell;
