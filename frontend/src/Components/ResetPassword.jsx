import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );
      setMessage(res.data.message || "✅ Password reset successful!");

      // After 2 seconds, open AuthModal login
      setTimeout(() => {
        navigate("/auth", { state: { view: "login", backgroundLocation: { pathname: "/" } } });
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Reset failed!");
    }

    setLoading(false);
  };

  const goBackToLogin = () => {
    navigate("/auth", { state: { view: "login", backgroundLocation: { pathname: "/" } } });
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Reset Password</h2>
        <p>Enter your new password below.</p>

        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Reset Password"}
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

export default ResetPassword;
