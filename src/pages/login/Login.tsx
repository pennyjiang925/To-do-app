import { useState } from "react";
import axios from "axios";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const login = async () => {
    const data = {
      email: email,
      password: password,
    };

    await axios
      .post("https://api-nodejs-todolist.herokuapp.com/user/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);

        navigate("/");
      })
      .catch(() => {
        setOpen(true);
        setMessage("The user name or password is incorrect");
      });
  };

  const handleClose = (event?: React.SyntheticEvent | Event) => {
    setOpen(false);
  };

  return (
    <div className="login">
      <div className="wrap">
        <h2 className="title">Please Login</h2>
        <TextField
          fullWidth
          label="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control"
        />
        <br />
        <TextField
          fullWidth
          type="password"
          label="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-control"
        />
        <br />
        <Button onClick={login} fullWidth variant="contained">
          Login
        </Button>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          message={message}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>

        <div className="auth-option text-center pt-2">
          No Account?{" "}
          <Link className="text-link" to="/register">
            Sign up{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
