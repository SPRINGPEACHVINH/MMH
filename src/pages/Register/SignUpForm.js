import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SignUp.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiRequest";

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

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            Email: form.Email,
            Password: form.Password,
            UserName: form.UserName,
            ConfirmPassword: form.confirmPassword
        }
        registerUser(newUser, dispatch, navigate);
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
