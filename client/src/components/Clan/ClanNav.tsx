import Axios from "axios";
import React from "react";
import About from "./About";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import PostList from "./Posts/PostList";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import { selectUser } from "../../store/user";
import AppBar from "@material-ui/core/AppBar";
import ClanDetailsHeader from "./ClanDetailsHeader";
import { makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import MembersListShell from "./Members/MembersListShell";
import RequestListShell from "./Requests/RequestListShell";
import { selectClan, deSelectClan } from "../../store/clan";
import AllegianceListShell from "./Allegiances/AllegianceListShell";
import { Clan, RequestToJoin, User, Allegiance } from "../../models";
import { RouteComponentProps, Route, useHistory } from "react-router";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`,
    };
}

interface LinkTabProps {
    label: string;
    href: string;
    handleChange: () => void;
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            component={Link}
            to={props.href}
            onClick={props.handleChange}
            label={props.label}
        />
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
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
    const user = useSelector(selectUser);
    const [clan, setClan] = React.useState<Clan | null>(null);
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = React.useState<number>(4);

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };
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
            dispatch(deSelectClan());
        };
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
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    aria-label="nav tabs example"
                >
                    <LinkTab
                        label="Posts"
                        handleChange={() => handleChange(0)}
                        href={`${url}/posts`}
                        {...a11yProps(0)}
                    />
                    <LinkTab
                        label="About"
                        handleChange={() => handleChange(1)}
                        href={`${url}/about`}
                        {...a11yProps(1)}
                    />
                    <LinkTab
                        label="Members"
                        handleChange={() => handleChange(2)}
                        href={`${url}/members`}
                        {...a11yProps(2)}
                    />
                    <LinkTab
                        label="Allegiances"
                        handleChange={() => handleChange(3)}
                        href={`${url}/allegiances`}
                        {...a11yProps(3)}
                    />
                    <LinkTab
                        label="Requests"
                        handleChange={() => handleChange(4)}
                        href={`${url}/requests`}
                        {...a11yProps(4)}
                    />
                </Tabs>
            </AppBar>
            {clan && user && (
                <>
                    <Box p={3}>
                        <Typography component="div">
                            <ClanDetailsHeader
                                members={clan.members}
                                requests={clan.requests}
                                clanId={clan.id}
                                navigateTo={navigateTo}
                                updateMembers={updateMembers}
                                updateRequests={updateRequests}
                                user={user}
                            />
                        </Typography>
                    </Box>
                    <Route
                        path={`${path}/posts`}
                        render={() => (
                            <TabPanel value={value} index={0}>
                                <PostList clanId={clan.id} user={user} />
                            </TabPanel>
                        )}
                    />
                    <Route
                        path={`${path}/about`}
                        render={() => (
                            <TabPanel value={value} index={1}>
                                <About description={clan.description} />
                            </TabPanel>
                        )}
                    />

                    <Route
                        path={`${path}/members`}
                        render={() => (
                            <TabPanel value={value} index={2}>
                                <MembersListShell
                                    updateMembers={updateMembers}
                                    isAdmin={new RegExp(/Founder|Leader/).test(
                                        user.role
                                    )}
                                    users={clan.members}
                                />
                            </TabPanel>
                        )}
                    />
                    <Route
                        path={`${path}/allegiances`}
                        render={() => (
                            <TabPanel value={value} index={3}>
                                <AllegianceListShell
                                    allegiances={clan.allegiances}
                                    clanId={clan.id}
                                    user={user}
                                    updateAllegiances={updateAllegiances}
                                />
                            </TabPanel>
                        )}
                    />
                    <Route
                        path={`${path}/requests`}
                        render={() => (
                            <TabPanel value={value} index={4}>
                                <RequestListShell
                                    requests={clan.requests}
                                    user={user}
                                    updateRequests={updateRequests}
                                    clanId={clan.id}
                                />
                            </TabPanel>
                        )}
                    />
                </>
            )}
        </div>
    );
};
export default ClanNav;
