import { useState, useEffect } from "react";
// import axios from 'axios'
import { todoService } from "../../index";
import { Button, Snackbar, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";
import { SignupFormField } from "../../components/signupForm/SignupForm";

interface UserInfo {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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
    confirmpassword: "",
  });

  console.log(info);

  useEffect(() => {
    if (info.password.length < 7) {
      setPasswordMessage("Password minimun length 7");
    } else {
      setPasswordMessage("");
    }

    return;
  }, [info.password.length, passwordFocus]);

  useEffect(() => {
    if (info.confirmpassword.length < 7) {
      setConfirmPasswordMessage("Confirm your password");
    } else if (info.confirmpassword !== info.password) {
      setConfirmPasswordMessage("Password does not match");
    } else {
      setConfirmPasswordMessage("");
    }
    return;
  }, [confirmPasswordFocus, info.confirmpassword, info.password]);

  const onValidate = () => {
    setValidate(true);
    if (passwordMessage || confirmPasswordMessage) return false;
    return true;
  };

  const registerHandler = async () => {
    if (!onValidate()) return;

    const res = await todoService.registerhandler(info);
    setOpen(true);

    if (!res) {
      setMessage("Registration failure");
      return;
    }

    setMessage("Registration successfull");
    navigate("/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const isShowError = (key: keyof UserInfo) => !info[key];
  // const getHelperText = (value: string) => value;

  return (
    <div className="register">
      <form className="wrap">
        <h2 className="title">Register Page</h2>
        <SignupFormField
          label="name"
          type="text"
          onChange={(value) => setInfo({ ...info, username: value })}
          minLength={0}
          error={true}
        />
        <br />
        <br />
        <SignupFormField
          label="email"
          type="text"
          onChange={(value) => setInfo({ ...info, email: value })}
          minLength={0}
          error={true}
        />
        <br />
        <br />
        <SignupFormField
          label="password"
          type="text"
          onChange={(value) => setInfo({ ...info, password: value })}
          minLength={7}
          error={true}
        />
        <br />
        <br />

        <SignupFormField
          label="confirmpassword"
          type="text"
          onChange={(value) => setInfo({ ...info, confirmpassword: value })}
          minLength={7}
          error={true}
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
