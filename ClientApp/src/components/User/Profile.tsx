import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../models";
import { selectUser, updateUser } from "../../store/user";
import Axios from "axios";
import { TextField, Grid, Typography, Button } from "@material-ui/core";

const Profile = () => {
    const user = useSelector(selectUser);
    const [password, setPassword] = React.useState<string>("");
    const [confirmPw, setConfirmPw] = React.useState<string>("");
    const [userForm, setUserForm] = React.useState<User>({ ...user } as User);
    const [changeDetected, setChangeDetected] = React.useState<boolean>(false);
    const [emailErrors, setEmailErrors] = React.useState<string[] | null>(null);
    const [isChangePassword, setIsChangePassword] = React.useState<boolean>(
        false
    );
    const dispatch = useDispatch();
    // React.useEffect(() => {
    //     if (user?.id) {
    //         Axios.get("/api/user")
    //             .then((response) =>
    //                 setUserForm({ ...userForm, ...response.data })
    //             )
    //             .catch((err) => console.log("Error when updating user", err));
    //     }
    // }, [user]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!changeDetected) setChangeDetected(true);
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    };

    const togglePwForm = () => {
        setIsChangePassword(!isChangePassword);
    };

    const handleSubmit = () => {
        if (!changeDetected) return;
        const updatedUser = {
            FirstName: userForm.firstName,
            LastName: userForm.lastName,
            Email: userForm.email,
            Id: userForm.id,
            ClanId: userForm.clanId,
            Role: userForm.role,
        };

        if (isChangePassword) {
            if (password === confirmPw) {
                Axios.post("/api/user/updatePW", {
                    ...updatedUser,
                    Password: password,
                })
                    .then((response) => console.log(response))
                    .catch((err) =>
                        console.log("Error when updating user", err)
                    );
            }
        } else {
            Axios.post<User>("/api/user/update", updatedUser)
                .then((response) => {
                    console.log(response);
                    dispatch(updateUser(response.data));
                })
                .catch((err) => console.log("Error when updating user", err));
        }
    };
    const handleCheckEmailIsTaken = () => {
        Axios.post<{ isTaken: boolean }>("/api/auth/checkemail", {
            Email: userForm.email,
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

    const passwordForm = (
        <>
            <Grid item xs={12}>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setChangeDetected(true);
                    }}
                    label="Password"
                    type="password"
                    autoComplete="password"
                    value={password}
                    color="primary"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={(e) => {
                        setConfirmPw(e.target.value);
                        setChangeDetected(true);
                    }}
                    label="Confirm Password"
                    type="password"
                    autoComplete="password"
                    value={confirmPw}
                    color="primary"
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="default"
                    onClick={togglePwForm}
                >
                    Cancel
                </Button>
            </Grid>
        </>
    );

    return (
        <form>
            <Grid
                container
                direction="column"
                spacing={3}
                justify="center"
                alignItems="center"
            >
                <Typography variant="h5" color="textPrimary">
                    Edit Profile
                </Typography>
                <Grid item xs={12}>
                    <TextField
                        label="First Name"
                        onChange={handleChange}
                        color="primary"
                        name="firstName"
                        value={userForm.firstName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Last Name"
                        onChange={handleChange}
                        color="primary"
                        name="lastName"
                        value={userForm.lastName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        onChange={handleChange}
                        color="primary"
                        onBlur={handleCheckEmailIsTaken}
                        type="email"
                        name="email"
                        value={userForm.email}
                    />
                </Grid>
                {isChangePassword ? (
                    passwordForm
                ) : (
                    <Grid item xs={12}>
                        <Button onClick={togglePwForm}>Change Password</Button>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default Profile;
