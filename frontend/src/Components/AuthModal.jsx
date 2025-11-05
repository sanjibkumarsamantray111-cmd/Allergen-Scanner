import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthModal.css";
import { Eye, EyeOff } from "lucide-react"; // 👁 import icons
import heroBg from "../assets/Gemini_Generated_Image_wwxt2mwwxt2mwwxt.png";

const AuthModal = ({ closeModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁 state to toggle visibility

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
         localStorage.clear();
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        setMessage(res.data.message || "Logged in");
        setMessageType("success");

        setTimeout(() => {
          if (typeof closeModal === "function") closeModal();
          navigate("/dashboard");
        }, 600);
      } else {
        localStorage.clear();
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        setMessage(res.data.message || "Registered");
        setMessageType("success");
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong!");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (typeof closeModal === "function") closeModal();
  };

  const handleModalClick = (e) => e.stopPropagation();

  return (
    <div className="auth-modal-container" onClick={handleClose}>
      <button className="back-btn" onClick={handleClose} aria-label="Close auth modal">
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      <div className="auth-modal" onClick={handleModalClick}>
        <div className="auth-box">
          <div className="welcome-section">
            <h2>Hello, Welcome!</h2>
            <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
            <button className="switch-btn" onClick={() => setIsLogin((s) => !s)}>
              {isLogin ? "Register" : "Login"}
            </button>
          </div>

          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <h2>{isLogin ? "Login" : "Register"}</h2>

              {message && (
                <p className={messageType === "success" ? "msg-success" : "msg-error"}>
                  {message}
                </p>
              )}

              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              {/* 👁 Password input with eye toggle */}
<div className="password-container">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleInputChange}
    required
  />
  <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </span>
</div>


              {isLogin && (
                <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </a>
              )}

              <button type="submit" className="main-btn" disabled={loading}>
                {loading ? "Loading..." : isLogin ? "Login" : "Create Account"}
              </button>

              <p className="social-text">or login with social platforms</p>
              <div className="social-btns">
                <button type="button" aria-label="Sign in with Google">
                  <i className="fa-brands fa-google google"></i>
                </button>
                <button type="button" aria-label="Sign in with Facebook">
                  <i className="fa-brands fa-facebook facebook"></i>
                </button>
                <button type="button" aria-label="Sign in with Apple">
                  <i className="fa-brands fa-apple apple"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;