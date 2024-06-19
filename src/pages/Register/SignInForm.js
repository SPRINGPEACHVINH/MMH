import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
import "../../styles/SignIn.css";

function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const newUSer = {
      username: username,
      password: password,
    };
    loginUser(newUSer, dispatch, navigate);
  };

  return (
    <form className="signin-form" onSubmit={handleLogin}>
      <label className="signin-label">
        Username:
        <input
          type="text"
          name="UserName"
          placeholder="Nhập username"
          className="input-username"
          required
        />
      </label>

      <label className="password-container">
        Mật khẩu:
        <input
          name="Password"
          placeholder="Nhập mật khẩu"
          className="input-password"
          required
        />
      </label>

      <input className="signin-submit" type="submit" value="Đăng nhập" />

      <div className="signup-link">
        Chưa có tài khoản?{" "}
        <a style={{ fontSize: 16 }} href="/SignUp">
          Đăng ký
        </a>
      </div>
    </form>
  );
}

export default SignInForm;
