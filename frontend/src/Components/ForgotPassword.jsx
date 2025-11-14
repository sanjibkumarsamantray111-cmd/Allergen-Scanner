import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(res.data.message || "✅ Reset link sent to your email!");
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Error sending reset link");
    }
    setLoading(false);
  };

  const goBackToLogin = () => {
    navigate("/auth", { state: { view: "login", backgroundLocation: { pathname: "/" } } });
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Forgot Password?</h2>
        <p>Enter your registered email to receive a reset link.</p>

        <form onSubmit={handleForgot}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="response-msg">{message}</p>}

        <p className="back-link" onClick={goBackToLogin}>
          ← Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
