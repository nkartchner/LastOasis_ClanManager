import React from "react";
import Group from "@material-ui/icons/Group";
import HotTub from "@material-ui/icons/HotTub";
import ListItem from "@material-ui/core/ListItem";
import GroupAdd from "@material-ui/icons/GroupAdd";
import Dashboard from "@material-ui/icons/Dashboard";
import PeopleSharp from "@material-ui/icons/PeopleSharp";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BlurCircularIcon from "@material-ui/icons/BlurCircular";
interface Props {
  clanId: number | null;
  redirectTo: (path: string) => () => void;
}

const SidenavMenu: React.FC<Props> = ({ clanId, redirectTo }) => {
  return (
    <>
      <ListItem button onClick={redirectTo("/dashboard")}>
        <ListItemIcon>
          <HotTub />
        </ListItemIcon>
        <ListItemText primary={`Home`} />
      </ListItem>

      <ListItem button onClick={redirectTo("/users")}>
        <ListItemIcon>
          <Group />
        </ListItemIcon>
        <ListItemText primary={"Users"} />
      </ListItem>

      <ListItem button onClick={redirectTo("/clans")}>
        <ListItemIcon>
          <PeopleSharp />
        </ListItemIcon>
        <ListItemText primary={"Clans"} />
      </ListItem>
      <ListItem button onClick={redirectTo("/techtree")}>
        <ListItemIcon>
          <BlurCircularIcon />
        </ListItemIcon>
        <ListItemText primary={"Tech Tree"} />
      </ListItem>
      {clanId ? (
        <ListItem button onClick={redirectTo(`/clans/${clanId}/posts`)}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary={"Your Clan"} />
        </ListItem>
      ) : (
        <ListItem button onClick={redirectTo("/clans/new")}>
          <ListItemIcon>
            <GroupAdd />
          </ListItemIcon>
          <ListItemText primary={"New Clan"} />
        </ListItem>
      )}
    </>
  );
};

export default SidenavMenu;
