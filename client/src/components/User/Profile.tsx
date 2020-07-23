import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../models";
import * as UserActions from "../../store/user/user.actions";
import * as fromUser from "../../store/user";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Profile = () => {
  const user = useSelector(fromUser.selectUser);
  const [password, setPassword] = React.useState<string>("");
  const [confirmPw, setConfirmPw] = React.useState<string>("");
  const [userForm, setUserForm] = React.useState<User>({ ...user } as User);
  const [changeDetected, setChangeDetected] = React.useState<boolean>(false);
  const [emailErrors, setEmailErrors] = React.useState<string[] | null>(null);
  const [isChangePassword, setIsChangePassword] = React.useState<boolean>(
    false
  );
  const dispatch = useDispatch();

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
          ConfirmPassword: confirmPw,
        })
          .then(() => togglePwForm())
          .catch((err) => console.log("Error when updating user", err));
      }
    } else {
      Axios.post<User>("/api/user/update", updatedUser)
        .then((response) => {
          dispatch(UserActions.updateUser(response.data));
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
        console.log("Checking the email failed. Here is the error", err);
      });
  };

  const passwordForm = (
    <>
      <div style={{ marginBottom: 16 }}>
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
      </div>
      <div style={{ marginBottom: 16 }}>
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
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button variant="contained" color="secondary" onClick={togglePwForm}>
          Cancel
        </Button>
      </div>
    </>
  );

  return (
    <form style={{ padding: 16, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          style={{ marginBottom: 16 }}
          variant="h5"
          color="textPrimary"
        >
          Edit Profile
        </Typography>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="First Name"
            onChange={handleChange}
            color="primary"
            name="firstName"
            value={userForm.firstName}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Last Name"
            onChange={handleChange}
            color="primary"
            name="lastName"
            value={userForm.lastName}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Email"
            onChange={handleChange}
            color="primary"
            onBlur={handleCheckEmailIsTaken}
            type="email"
            name="email"
            value={userForm.email}
          />
        </div>
        {isChangePassword ? (
          passwordForm
        ) : (
          <div style={{ marginBottom: 16 }}>
            <Button onClick={togglePwForm}>Change Password</Button>
          </div>
        )}
        <div style={{ marginBottom: 16 }}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Profile;
