import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SignUp.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions";
import Password from "antd/es/input/Password";

function SignUpForm() {
  const [form, setForm] = useState({
    UserName: "",
    Email: "",
    Password: "",
    confirmPassword: "",
    PhoneNumber: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8881/api/user/sign-up", {
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
      url: "https://nt208.onrender.com/api/user/sign-in",
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
    <form className="signup-form" onSubmit={handleSubmit}>
      <label className="signup-label">
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

      <label className="signup-label">
        Email:
        <input
          type="email"
          name="Email"
          placeholder="Nhập email"
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
          onChange={handleChange}
          className="input-password"
          required
        />
      </label>

      <label className="signup-label">
        Số điện thoại:
        <input
          type="tel"
          name="PhoneNumber"
          placeholder="Nhập số điện thoại"
          onChange={handleChange}
          className="input-phone-number"
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
