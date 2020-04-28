import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, selectError } from "../../store/user";
import { TextField, Button, Grid, Typography } from "@material-ui/core";

const LoginPage: React.FC = () => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const dispatch = useDispatch();

    const error = useSelector(selectError);
    const handleSubmit = () => {
        dispatch(actionCreators.login({ Email: email, Password: password }));
    };

    return (
        <div style={{ padding: 10 }}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                <Typography variant="h4" color="textPrimary">
                    Login
                </Typography>
                {error && (
                    <Typography variant="body2" color="secondary">
                        {error}
                    </Typography>
                )}
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        value={email}
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        color="primary"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        value={password}
                        autoComplete="password"
                        onChange={(e) => setPassword(e.target.value)}
                        color="primary"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default LoginPage;
