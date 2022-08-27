import { useState, useEffect } from "react";
// import axios from 'axios'
import { todoService } from "../../index";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

interface UserInfo {
  username: string;
  email: string;
  password: string;
  cofirmpassword: string;
}

const NAME_REGEX = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

const Register = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [userNameFocus, setUserNameFocus] = useState(false);
  const [nameMessage, setNameMessage] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [validate, setValidate] = useState(false);

  const [info, setInfo] = useState<UserInfo>({
    username: "",
    email: "",
    password: "",
    cofirmpassword: "",
  });

  console.log(info);

  useEffect(() => {
    if (!NAME_REGEX.test(info.username)) {
      setNameMessage("Username is required");
    } else {
      setNameMessage("");
    }
    return;
  }, [info.username, userNameFocus]);

  useEffect(() => {
    if (!info.email) {
      setEmailMessage("Email is required");
      return;
    }

    if (!EMAIL_REGEX.test(info.email)) {
      setEmailMessage("Please enter the correct email");
      return;
    }

    setEmailMessage("");
  }, [emailFocus, info.email]);

  useEffect(() => {
    if (info.password.length < 7) {
      setPasswordMessage("Password minimun length 7");
    } else {
      setPasswordMessage("");
    }

    return;
  }, [info.password.length, passwordFocus]);

  useEffect(() => {
    if (info.cofirmpassword.length < 7) {
      setConfirmPasswordMessage("Confirm your password");
    } else if (info.cofirmpassword !== info.password) {
      setConfirmPasswordMessage("Password does not match");
    } else {
      setConfirmPasswordMessage("");
    }
    return;
  }, [confirmPasswordFocus, info.cofirmpassword, info.password]);

  const onValidate = () => {
    setValidate(true);
    if (
      nameMessage ||
      emailMessage ||
      passwordMessage ||
      confirmPasswordMessage
    )
      return false;
    return true;
  };

  const registerHandler = async () => {
    if (!onValidate()) return;

    const res = await todoService.registerhandler(info);
    setOpen(true);

    if (!res) {
      setMessage("Registered failed");
      return;
    }

    setMessage("Registered successfully");
    navigate("/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isShowError = (key: keyof UserInfo) => !info[key];
  const getHelperText = (value: string) => value;

  return (
    <div className="register">
      <form className="wrap">
        <h2 className="title">Register Page</h2>
        <TextField
          fullWidth
          label="name"
          error={isShowError("username")}
          helperText={getHelperText(nameMessage)}
          type="text"
          className="form-control"
          onChange={(e) => setInfo({ ...info, username: e.target.value })}
          onFocus={() => setUserNameFocus(true)}
          onBlur={() => setUserNameFocus(false)}
          required
        />
        <br />
        <br />
        <TextField
          error={isShowError("email")}
          helperText={getHelperText(emailMessage)}
          fullWidth
          type="email"
          label="email"
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          className="form-control"
        />
        <br />
        <br />
        <TextField
          error={isShowError("password")}
          helperText={getHelperText(passwordMessage)}
          fullWidth
          type="password"
          label="password"
          onChange={(e) => setInfo({ ...info, password: e.target.value })}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          className="form-control"
        />
        <br />
        <br />

        <TextField
          error={isShowError("cofirmpassword")}
          helperText={getHelperText(confirmPasswordMessage)}
          fullWidth
          type="password"
          label="confirm password"
          onChange={(e) => setInfo({ ...info, cofirmpassword: e.target.value })}
          onFocus={() => setConfirmPasswordFocus(true)}
          onBlur={() => setConfirmPasswordFocus(false)}
          className="form-control"
        />
        <br />
        <br />

        <Button onClick={registerHandler} fullWidth variant="contained">
          Register
        </Button>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          open={open}
          message={message}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>

        <div className="auth-option text-center pt-2">
          Have an account?{" "}
          <Link className="text-link" to="/login">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
