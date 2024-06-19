import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions";
import { message } from "antd";
import "../../styles/SignIn.css";

function SignInForm() {
  const [form, setForm] = useState({
    UserName: "",
    Password: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8888/api/user/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (data.status === "ERROR") {
        throw new Error(data.message);
      }

      dispatch(logIn(form.UserName));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", form.UserName);
      navigate("/");
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="signin-form" onSubmit={handleLogin}>
      <label className="signin-label">
        Username:
        <input
          type="text"
          name="UserName"
          placeholder="Nhập username"
          onChange={handleChange}
          className="input-username"
          required
        />
      </label>

      <label className="password-container">
        Mật khẩu:
        <input
          name="Password"
          placeholder="Nhập mật khẩu"
          onChange={handleChange}
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
