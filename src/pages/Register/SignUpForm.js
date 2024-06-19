import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SignUp.css";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions";
import axios from "axios";
import { message } from "antd";

function SignUpForm() {
    const [form, setForm] = useState({
        UserName: "",
        Email: "",
        Password: "",
        confirmPassword: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const handleRegister = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:8888/api/user/signup", {
          mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserName: form.UserName,
            Password: form.Password,
            confirmPassword: form.confirmPassword,
            Email: form.Email,
            PhoneNumber: form.PhoneNumber,
          }
          ),
        });
  
        const data = await response.json();
  
        if (data.status === "ERROR") {
          throw new Error(data.message);
        }
  
        navigate("/SignIn");
      } catch (error) {
        message.error(error.message);
      }
  
      const signin = {
        method: "POST",
        url: "http://localhost:8888/api/user/signup",
        headers: {},
        body: JSON.stringify({
          UserName: form.UserName,
          Password: form.Password,
        }),
      };
      await axios(signin);
  
      dispatch(logIn(form.UserName));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", form.UserName);
      navigate("/");
    };

  return (
    <form className="signup-form" onSubmit={handleRegister}>
      <label className="signup-label">
        Username:
        <input
          type="text"
          name="UserName"
          placeholder="Nhập username"
          value={form.UserName}
          onChange={handleChange}
          className="input-username"
          required
        />
      </label>

      <label className="signup-label">
        Email:
        <input
          type="email"
          name="Email"
          placeholder="Nhập email"
          value={form.Email}
          onChange={handleChange}
          className="input-email"
          required
        />
      </label>

      <label className="password-container">
        Mật khẩu:
        <input
          type={showPassword ? "text" : "password"}
          name="Password"
          placeholder="Nhập mật khẩu"
          value={form.Password}
          onChange={handleChange}
          className="input-password"
          required
        />
      </label>

      <label className="password-container">
        Xác nhận lại mật khẩu:
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          value={form.confirmPassword}
          onChange={handleChange}
          className="input-password"
          required
        />
      </label>

      <div className="agreement">
        <input type="checkbox" required />
        <span style={{ fontSize: "0.8em", marginTop: "3px", fontSize: "13px" }}>
          Tôi đồng ý với <a href="#">Điều khoản sử dụng</a> và{" "}
          <a href="#">Chính sách bảo mật</a> của NT219
        </span>
      </div>

      <input className="signup-submit" type="submit" value="Tiếp tục" />

      <div className="login-link">
        Đã có tài khoản? <a href="/SignIn">Đăng nhập</a>
      </div>
    </form>
  );
}

export default SignUpForm;
