import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fromUser from "../../store/user/";
import * as UserActions from "../../store/user/user.actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector(fromUser.selectError);

  const handleSubmit = () => {
    dispatch(UserActions.login({ Email: email, Password: password }, history));
  };
  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 /** ENTER */) handleSubmit();
  };

  return (
    <form style={{ padding: 10, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="textPrimary">
          Login
        </Typography>
        {error && (
          <Typography variant="body2" color="secondary">
            {error}
          </Typography>
        )}
        <div style={{ marginBottom: 10 }}>
          <TextField
            label="Email"
            value={email}
            autoComplete="email"
            onKeyDown={handleKeydown}
            onChange={(e) => setEmail(e.target.value)}
            color="primary"
            variant="outlined"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <TextField
            label="Password"
            value={password}
            autoComplete="password"
            type="password"
            onKeyDown={handleKeydown}
            onChange={(e) => setPassword(e.target.value)}
            color="primary"
            variant="outlined"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
