import {
    Grid,
    Button,
    TextField,
    Typography,
    makeStyles,
    CircularProgress,
} from "@material-ui/core";
import React from "react";
import faker from "faker";
import { User } from "../../models";
import Axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/user";
import { RouteComponentProps } from "react-router";
import { setAxiosDefaultToken } from "../../config/axios.config";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > * + *": {
            marginLeft: theme.spacing(2),
        },
    },
    field: {
        marginTop: 10,
        marginBottom: 10,
    },
}));

const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [lastName, setLastName] = React.useState<string>(
        faker.name.lastName()
    );
    const [firstName, setFirstName] = React.useState<string>(
        faker.name.firstName()
    );
    const [email, setEmail] = React.useState<string>(
        faker.internet.email(firstName, lastName)
    );
    const [password, setPassword] = React.useState<string>("test");
    const [confirmPw, setConfirmPw] = React.useState<string>("test");
    const [pwError, setPwError] = React.useState<string[] | null>(null);
    const [isRegistering, setIsRegistering] = React.useState<boolean>(false);
    const [fNameErrors, setFNameErrors] = React.useState<string[] | null>(null);
    const [lNameErrors, setLNameErrors] = React.useState<string[] | null>(null);
    const [emailErrors, setEmailErrors] = React.useState<string[] | null>(null);

    const handleSubmit = () => {
        if (fNameErrors || lNameErrors || emailErrors || pwError) {
            return;
        }
        setIsRegistering(true);
        Axios.post<{ user: User }>("/api/auth/register", {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password,
            ConfirmPassword: confirmPw,
            Role: null,
            ClanId: null,
        })
            .then((response) => {
                console.log(response.data.user);
                dispatch(loginSuccess(response.data.user));
                localStorage.setItem("Token", response.data.user.token);
                setAxiosDefaultToken();
                history.push("/dashboard");
            })
            .catch((err: AxiosError) => {
                const errors: { [key: string]: string[] } | undefined =
                    err.response?.data.errors;
                if (errors) {
                    if ("Email" in errors) setEmailErrors(errors.Email);
                    if ("FirstName" in errors) setFNameErrors(errors.FirstName);
                    if ("LastName" in errors) setLNameErrors(errors.LastName);
                    if ("Password" in errors) setPwError(errors.Password);
                    if ("ConfirmPassword" in errors)
                        setPwError(errors.ConfirmPassword);
                }
                setIsRegistering(false);
            });
    };

    const handleCheckEmailIsTaken = () => {
        Axios.post<{ isTaken: boolean }>("/api/auth/checkemail", {
            Email: email,
        })
            .then(({ data }) => {
                const errorMessage = "Email is already in use";
                if (data.isTaken) {
                    if (emailErrors) {
                        setEmailErrors([...emailErrors, errorMessage]);
                    } else {
                        setEmailErrors([errorMessage]);
                    }
                } else if (emailErrors && emailErrors.includes(errorMessage)) {
                    const newErrors = emailErrors.filter(
                        (error) => error !== errorMessage
                    );
                    if (newErrors.length === 0) {
                        setEmailErrors(null);
                    } else {
                        setEmailErrors(newErrors);
                    }
                }
            })
            .catch((err) => {
                console.log(
                    "Checking the email failed. Here is the error",
                    err
                );
            });
    };

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h5" color="textPrimary">
                    Register
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    className={classes.field}
                    value={firstName}
                    onBlur={(e) => {
                        if (!!fNameErrors) {
                            if (e.target.value) setFNameErrors(null);
                        }
                    }}
                    label={!!fNameErrors ? "Error First Name" : "First Name"}
                    helperText={!!fNameErrors && fNameErrors.join(", and")}
                    error={!!fNameErrors}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    className={classes.field}
                    value={lastName}
                    onBlur={(e) => {
                        if (!!lNameErrors) {
                            if (e.target.value) setLNameErrors(null);
                        }
                    }}
                    label={!!lNameErrors ? "Error Last Name" : "Last Name"}
                    helperText={!!lNameErrors && lNameErrors.join(", and")}
                    error={!!lNameErrors}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    className={classes.field}
                    value={email}
                    type="email"
                    onBlur={handleCheckEmailIsTaken}
                    error={!!emailErrors}
                    label={!!emailErrors ? "Error Email" : "Email"}
                    helperText={!!emailErrors && emailErrors.join(", and")}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    error={!!pwError}
                    className={classes.field}
                    value={password}
                    type="password"
                    onBlur={(e) => {
                        if (!!pwError) {
                            if (e.target.value) setPwError(null);
                        }
                    }}
                    label={!!pwError ? "Error Password" : "Password"}
                    helperText={!!pwError && pwError.join(", and")}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    error={!!pwError}
                    type="password"
                    className={classes.field}
                    value={confirmPw}
                    label="Confirm Password"
                    onChange={(e) => setConfirmPw(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={Boolean(
                        fNameErrors || lNameErrors || emailErrors || pwError
                    )}
                    onClick={handleSubmit}
                >
                    {isRegistering ? (
                        <CircularProgress color="primary" />
                    ) : (
                        "Submit"
                    )}
                </Button>
            </Grid>
        </Grid>
    );
};

export default Register;
