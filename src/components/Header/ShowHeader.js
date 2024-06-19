import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../../styles/App.css";

const ShowHeader = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");
    if (isLoggedIn) {
      dispatch(logIn(username));
    }
  }, []);

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("username");
    navigate("/"); // Navigate to the home page after logging out
  };

  return (
    <div className="navbar">
      <nav>
        <h1 className="brand">
          <Link to="/">NT219</Link>
        </h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/transaction">Transfer Money</Link>
          </li>
          <li>
            <Link to="/history">Transaction History</Link>
          </li>
          <div className="actions">
              {isLoggedIn ? (
                <div className="user-dropdown" ref={dropdownRef}>
                  <button
                    className="user-button"
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                  >
                    <Avatar size="small" icon={<UserOutlined />} /> {username}
                  </button>
                  {dropdownVisible && (
                    <div
                      className={`user-dropdown-content ${
                        dropdownVisible ? "show" : ""
                      }`}
                    >
                      <button onClick={handleLogOut}>Đăng xuất</button>
                    </div>
                  )}
                </div>
              ) : (
                <button className="auth-button">
                  <Link to="/SignIn">Đăng nhập | Đăng ký</Link>
                </button>
              )}
            </div>
        </ul>
        <div style={{ clear: "both" }}></div>
      </nav>
    </div>
  );
};

export default ShowHeader;
