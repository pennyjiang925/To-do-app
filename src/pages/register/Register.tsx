import { FormEvent, useState } from "react";
import axios from "axios";

import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

interface userInfo {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState<userInfo>({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");

  const registerhandler = async (e: FormEvent) => {
    e.preventDefault();

    const response = await axios
      .post("https://api-nodejs-todolist.herokuapp.com/user/register", info)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch(() => {
        setOpen(true);
        setMessage("Register failed");
      });
  };

  const handleClose = (event?: React.SyntheticEvent | Event) => {
    setOpen(false);
  };

  return (
    <div className="register">
      <div className="wrap">
        <h2 className="title">Register Page</h2>
        <TextField
          fullWidth
          label="username"
          type="text"
          onChange={(e) => setInfo({ ...info, username: e.target.value })}
          required
          min-length={10}
          className="form-control"
        />
        {err ? (
          <span>
            Username should be 3-16 characters and shouldn't include any special
            character!
          </span>
        ) : null}

        <TextField
          fullWidth
          type="email"
          label="email"
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
          required
          min-length={10}
          className="form-control"
        />

        {err ? <span>It should be a valid email address!</span> : null}

        <TextField
          fullWidth
          type="password"
          label="password"
          onChange={(e) => setInfo({ ...info, password: e.target.value })}
          required
          className="form-control"
        />

        {err ? (
          <span>
            Password should be 8-20 characters and include at least 1 letter, 1
            number and 1 special character!
          </span>
        ) : null}
        <TextField
          fullWidth
          type="password"
          label="confirm password"
          onChange={(e) =>
            setInfo({ ...info, confirmpassword: e.target.value })
          }
          required
          className="form-control"
        />

        {err ? <span>Password don't match!</span> : null}
        <Button onClick={registerhandler} fullWidth variant="contained">
          Register
        </Button>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={6000}
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
      </div>
    </div>
  );
};

export default Register;
