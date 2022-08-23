import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

export const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar-wrap">
        <Link to={"/login"} className="nav-link">
          Login
        </Link>

        <Link to={"/register"} className="nav-link">
          Register
        </Link>
      </div>
    </nav>
  );
};
