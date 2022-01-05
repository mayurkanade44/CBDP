import React from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/data_context";

export const Navbar = () => {
  const { user, logout } = useDataContext();

  const onLogout = () => {
    logout();
  };

  const userLinks = (
    <>
      <li className="nav-item">
        <Link to="/home" className="nav-link">
          <h4>Home</h4>
        </Link>
      </li>
      <li onClick={onLogout} className="nav-item">
        <Link to="/" className="nav-link">
          <h4>Logout</h4>
        </Link>
      </li>
    </>
  );
  const guestLinks = (
    <>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          <h4>Login</h4>
        </Link>
      </li>
    </>
  );

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light mb-5"
        style={{ background: "#D3D3D3" }}
      >
        <div className="container">
          <div className="ms-2">
            <h2>Cloud Based Documents Portal</h2>
          </div>
          <ul className="navbar-nav mx-auto">
            {user ? (
              <li className="mt-2 ms-5">
                <h4 style={{ color: "#39A2DB" }}>
                  Hello <b style={{ color: "black" }}>{user}</b>
                </h4>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav ms-auto mx-2">
            {user ? userLinks : guestLinks}
          </ul>
        </div>
      </nav>
    </div>
  );
};
