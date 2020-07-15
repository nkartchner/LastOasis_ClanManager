import React from "react";
import Axios from "axios";
// import PostList from "./Posts/PostList";
import Grid from "@material-ui/core/Grid";
import { selectUser } from "../../store/user";
import { RouteComponentProps } from "react-router";
import Container from "@material-ui/core/Container";
import ClanDetailsHeader from "./ClanDetailsHeader";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import MembersListShell from "./Members/MembersListShell";
import RequestListShell from "./Requests/RequestListShell";
import { selectClan, deSelectClan } from "../../store/clan";
import AllegianceListShell from "./Allegiances/AllegianceListShell";
import { Clan, RequestToJoin, User, Allegiance } from "../../models";

type Props = RouteComponentProps<{ clanId: string }>;

const ClanDetails: React.FC<Props> = (props) => {
    const { clanId } = props.match.params;
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [clan, setClan] = React.useState<Clan | null>(null);
    React.useEffect(() => {
        if (clanId) {
            dispatch(selectClan(+clanId));
            Axios.get<Clan>(`/api/clan/${clanId}`)
                .then(({ data }) => setClan(data))
                .catch((err) =>
                    console.log(
                        "Something went wrong when trying to get the clan",
                        err
                    )
                );
        }
        return () => {
            console.log("Dispatching");
            dispatch(deSelectClan());
        };
    }, [props.match.params.clanId]);

    const navigateTo = (path: string) => {
        props.history.push(path);
    };

    const updateAllegiances = (allegiances: Allegiance[]) => {
        setClan({ ...clan!, allegiances });
    };

    const updateRequests = (requests: RequestToJoin[]) => {
        setClan({ ...clan!, requests });
    };

    const updateMembers = (members: User[]) => {
        setClan({ ...clan!, members });
    };

    return clan && user ? (
        <Container>
            <Grid
                container
                spacing={3}
                style={{ height: "100%" }}
                direction="column"
                wrap="nowrap"
                justify="space-around"
            >
                <Grid item xs={12}>
                    <Grid
                        container
                        direction="row"
                        wrap="nowrap"
                        justify="space-between"
                    >
                        <Typography color="textPrimary" variant="h5">
                            {clan.name}
                        </Typography>
                        <ClanDetailsHeader
                            members={clan.members}
                            requests={clan.requests}
                            clanId={clan.id}
                            navigateTo={navigateTo}
                            updateMembers={updateMembers}
                            updateRequests={updateRequests}
                            user={user}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <img
                        style={{ height: 70, backgroundColor: clan.color }}
                        src={clan.flag}
                        alt="clan flag"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography color="textPrimary" variant="h5">
                        Description
                    </Typography>
                    <Typography color="textPrimary" variant="body2">
                        {clan.description}
                    </Typography>
                </Grid>
                {user && (
                    <Grid item xs={12}>
                        <RequestListShell
                            requests={clan.requests}
                            user={user}
                            updateRequests={updateRequests}
                            clanId={clan.id}
                        />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Grid
                        container
                        direction="row"
                        wrap="nowrap"
                        justify="space-between"
                    >
                        <Grid style={{ padding: 10 }} item xs={12} sm={6}>
                            <Typography color="textPrimary" variant="h3">
                                Members
                            </Typography>
                            <MembersListShell
                                updateMembers={updateMembers}
                                isAdmin={new RegExp(/Founder|Leader/).test(
                                    user.role
                                )}
                                users={clan.members}
                            />
                        </Grid>
                        <Grid style={{ padding: 10 }} item xs={12} sm={6}>
                            {clan && user && (
                                <AllegianceListShell
                                    allegiances={clan.allegiances}
                                    clanId={clan.id}
                                    user={user}
                                    updateAllegiances={updateAllegiances}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid style={{ padding: 10 }} item xs={12}>
                    {/* <PostList clanId={clan.id} user={user} /> */}
                </Grid>
            </Grid>
        </Container>
    ) : (
        <div>...loading</div>
    );
};

export default ClanDetails;
