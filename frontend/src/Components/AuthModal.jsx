import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import "./AuthModal.css";

const AuthModal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Auto-switch to register/login based on state
  useEffect(() => {
    if (location.state?.view === "register") setIsLogin(false);
    else setIsLogin(true);
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      localStorage.clear();
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        setMessage(res.data.message || "Logged in successfully!");
        setMessageType("success");
        // ✅ redirect to dashboard after login
        setTimeout(() => navigate("/dashboard"), 600);
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        if (res.data.token) localStorage.setItem("token", res.data.token);
        if (res.data.user) localStorage.setItem("userData", JSON.stringify(res.data.user));
        localStorage.setItem("isNewAccount", "true");
        setMessage(res.data.message || "Registered successfully!");
        setMessageType("success");
        // ✅ redirect to dashboard after register
        setTimeout(() => navigate("/dashboard"), 600);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong!");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClick = (e) => e.stopPropagation();
  const handleClose = () => navigate("/");

  return (
    <div className="auth-modal-overlay" onClick={handleClose}>
      <div className="auth-modal-container" onClick={handleModalClick}>
        <button className="back-btn" onClick={handleClose}>←</button>
        <div className="auth-box">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h2>Hello, Welcome!</h2>
            <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
            <button className="switch-btn" onClick={() => setIsLogin((s) => !s)}>
              {isLogin ? "Register" : "Login"}
            </button>
          </div>

          {/* Form Section */}
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <h2>{isLogin ? "Login" : "Register"}</h2>
              {message && <p className={messageType === "success" ? "msg-success" : "msg-error"}>{message}</p>}
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
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {isLogin && (
                <button type="button" className="forgot-link" onClick={() => navigate("/forgot-password")}>
                  Forgot Password?
                </button>
              )}
              <button type="submit" className="main-btn" disabled={loading}>
                {loading ? "Loading..." : isLogin ? "Login" : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
