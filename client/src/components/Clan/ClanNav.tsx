import Axios from "axios";
import React from "react";
import About from "./About";
import PostList from "./Posts/PostList";
import * as fromUser from "../../store/user";
import ClanDetailsHeader from "./ClanDetailsHeader";
import { makeStyles, Theme } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import MembersListShell from "./Members/MembersListShell";
import RequestListShell from "./Requests/RequestListShell";
import { selectClan, deSelectClan } from "../../store/clan";
import AllegianceListShell from "./Allegiances/AllegianceListShell";
import { Clan, RequestToJoin, User, Allegiance } from "../../models";
import { RouteComponentProps, Route, useHistory } from "react-router";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: "grid",
    height: "100%",
    width: "100%",
    gridTemplateRows: "55px calc(100% - 55px)",
  },
  tabContainer: {
    display: "grid",
    padding: theme.spacing(0, 2),
    gridTemplateColumns: "repeat(5, min-content) 1fr",
    gap: "8px",
    alignItems:"center",
    backgroundColor: theme.palette.primary.main,
  },
  tab: {
    padding: theme.spacing(2, 3),
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.text.primary,
    ...theme.typography.body1,
    opacity: 0.7,
  },
  active: {
    borderBottom: "3px solid red",
    paddingBottom: theme.spacing(1),
    opacity: 1,
  },
  tabAction: {
    justifySelf: "end",
  },
  tabBody: {
    gridRow: 2,
    overflow: "auto",
    padding: theme.spacing(3),
  },
}));

type Props = RouteComponentProps<{ clanId: string }>;
const ClanNav: React.FC<Props> = (props) => {
  const {
    params: { clanId },
    path,
    url,
  } = props.match;
  const dispatch = useDispatch();
  const user = useSelector(fromUser.selectUser);
  const [clan, setClan] = React.useState<Clan | null>(null);
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {
    if (clanId) {
      dispatch(selectClan(+clanId));
      Axios.get<Clan>(`/api/clan/${clanId}`)
        .then(({ data }) => setClan(data))
        .catch((err) =>
          console.log("Something went wrong when trying to get the clan", err)
        );
      return () => {
        dispatch(deSelectClan());
      };
    }
  }, [clanId, dispatch]);

  const updateAllegiances = (allegiances: Allegiance[]) => {
    setClan({ ...clan!, allegiances });
  };

  const updateRequests = (requests: RequestToJoin[]) => {
    setClan({ ...clan!, requests });
  };

  const updateMembers = (members: User[]) => {
    setClan({ ...clan!, members });
  };
  const navigateTo = (path: string) => () => {
    history.push(path);
  };

  return (
    <div className={classes.root}>
      <div className={classes.tabContainer}>
        <NavLink
          activeClassName={classes.active}
          className={classes.tab}
          to={`${url}/posts`}
        >
          Posts
        </NavLink>
        <NavLink
          activeClassName={classes.active}
          className={classes.tab}
          to={`${url}/about`}
        >
          About
        </NavLink>
        <NavLink
          activeClassName={classes.active}
          className={classes.tab}
          to={`${url}/members`}
        >
          Members
        </NavLink>
        <NavLink
          activeClassName={classes.active}
          className={classes.tab}
          to={`${url}/allegiances`}
        >
          Allegiances
        </NavLink>
        <NavLink
          activeClassName={classes.active}
          className={classes.tab}
          to={`${url}/requests`}
        >
          Requests
        </NavLink>
        {clan && user && (
          <div className={classes.tabAction}>
            <ClanDetailsHeader
              members={clan.members}
              requests={clan.requests}
              clanId={clan.id}
              navigateTo={navigateTo}
              updateMembers={updateMembers}
              updateRequests={updateRequests}
              user={user}
            />
          </div>
        )}
      </div>
      {clan && user && (
        <div className={classes.tabBody}>
          <Route
            path={`${path}/posts`}
            render={() => <PostList clanId={clan.id} user={user} />}
          />
          <Route
            path={`${path}/about`}
            render={() => <About description={clan.description} />}
          />

          <Route
            path={`${path}/members`}
            render={() => (
              <MembersListShell
                updateMembers={updateMembers}
                isAdmin={new RegExp(/Founder|Leader/).test(user.role)}
                users={clan.members}
              />
            )}
          />
          <Route
            path={`${path}/allegiances`}
            render={() => (
              <AllegianceListShell
                allegiances={clan.allegiances}
                clanId={clan.id}
                user={user}
                updateAllegiances={updateAllegiances}
              />
            )}
          />
          <Route
            path={`${path}/requests`}
            render={() => (
              <RequestListShell
                requests={clan.requests}
                user={user}
                updateRequests={updateRequests}
                clanId={clan.id}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};
export default ClanNav;
