import React from "react";
import faker from "faker";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Clan, User } from "../../models";
import { makeStyles, Typography, Theme } from "@material-ui/core";
import Axios from "axios";
import { RouteChildrenProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../store";
import { FLAGS, HardCodedColors } from "./flags";
import { updateUser } from "../../store/user";
const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: "block",
    },
    root: {
        display: "flex",
        flexDirection: "column",
    },
    box: {
        margin: "0 auto",
        display: "flex",
        flexFlow: "row wrap",
        maxWidth: 500,
    },
    field: {
        flex: "1 1 100%",
        margin: theme.spacing(3, 0),
    },
    warningText: {
        marginTop: 10,
        marginBottom: 10,
    },
    warningBtn: {
        marginRight: 5,
        marginLeft: 5,
        color: theme.palette.text.primary,
    },
    colorBox: {
        height: 50,
        minWidth: 50,
        borderRadius: 10,
        margin: theme.spacing(1),
    },
    active: {
        outline: "none",
        borderColor: "#9ecaed",
        border: "1px solid rgba(81, 203, 238, 1)",
        boxShadow: "0 0 5px rgba(81, 203, 238, 1)",
    },
    colorScroll: {
        flex: "1 1 auto",
        overflowY: "hidden",
        overflowX: "auto",
        display: "flex",
        flexFlow: "row nowrap",
        height: 90,
    },
}));

const NewForm = () => ({
    color: faker.random.arrayElement(HardCodedColors),
    description: faker.lorem.paragraphs(2),
    flag: faker.random.arrayElement(FLAGS).src,
    name: faker.company.companyName(),
});

const NewClanForm: React.FC<RouteChildrenProps> = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user: User | null = useSelector<ApplicationState, User | null>(
        (state) => state.user!.user
    );
    const [error, setError] = React.useState<any>(null);
    const [formState, setFormState] = React.useState<Partial<Clan>>(NewForm());
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | { name?: string; value: unknown }
        >
    ) => {
        setFormState({ ...formState, [e.target.name!]: e.target.value });
    };
    const handleSubmit = () => {
        Axios.post<Clan>("/api/clan/new", {
            Color: formState.color,
            Description: formState.description,
            Flag: formState.flag,
            Name: formState.name,
        })
            .then(({ data }) => {
                dispatch(
                    updateUser({ ...user!, clanId: data.id, role: "Founder" })
                );
                history.push(`/clans/${data.id}`);
            })
            .catch((err) => setError(err));
    };

    const handleLeaveClan = () => {
        if (window.confirm("Are you sure you want to leave your clan?")) {
            Axios.post("/api/clan/Leave")
                .then((response) => console.log(response.data))
                .catch((err) => console.log(err));
        }
    };

    const handleGoBack = () => {
        history.back();
    };

    const LeaveClanWarning = (
        <>
            <Typography
                className={classes.warningText}
                variant="h3"
                color="error"
            >
                Warning!
            </Typography>
            <Typography
                className={classes.warningText}
                variant="body1"
                color="textPrimary"
            >
                You must leave your clan first before you can make a new one!
            </Typography>
            <Button
                className={classes.warningBtn}
                onClick={handleLeaveClan}
                variant="contained"
                color="secondary"
            >
                Leave Clan
            </Button>
            <Button
                className={classes.warningBtn}
                onClick={handleGoBack}
                variant="contained"
                color="primary"
            >
                Go Back
            </Button>
        </>
    );
    const Form = (
        <>
            <Typography variant="h5" color="textPrimary">
                Create a new Clan
            </Typography>
            <TextField
                className={classes.field}
                color="primary"
                variant="outlined"
                label="Name"
                onChange={handleChange}
                name="name"
                value={formState.name}
            />
            <div className={classes.colorScroll}>
                {HardCodedColors.map((color, i) => (
                    <div
                        onClick={() => setFormState({ ...formState, color })}
                        key={i}
                        className={
                            formState.color === color
                                ? `${classes.active} ${classes.colorBox}`
                                : `${classes.colorBox}`
                        }
                        style={{ backgroundColor: color }}
                    ></div>
                ))}
            </div>
            <Select
                className={classes.field}
                variant="outlined"
                color="primary"
                label="Flag"
                onChange={handleChange}
                name="flag"
                value={formState.flag}
            >
                {FLAGS.map((flag, i) => (
                    <MenuItem
                        key={flag.id}
                        className={classes.colorBox}
                        value={flag.src}
                    >
                        <img
                            src={flag.src}
                            style={{
                                backgroundColor: formState.color,
                                height: "100%",
                            }}
                            alt={`flag${i + 1}`}
                        />
                    </MenuItem>
                ))}
            </Select>
            <TextField
                className={classes.field}
                color="primary"
                variant="outlined"
                onChange={handleChange}
                name="description"
                multiline
                rows={4}
                label="Description"
                value={formState.description}
            />
            <Button variant="contained" onClick={handleSubmit} color="primary">
                Submit
            </Button>
        </>
    );
    return (
        <div className={classes.container}>
            {error && JSON.stringify(error)}
            <div className={classes.root}>
                <div className={classes.box}>
                    {user && user.clanId ? LeaveClanWarning : Form}
                </div>
            </div>
        </div>
    );
};

export default NewClanForm;
