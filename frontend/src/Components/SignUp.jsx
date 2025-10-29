import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./signup.css";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

const [message, setMessage] = useState("");          
  const [messageType, setMessageType] = useState("");
   const navigate = useNavigate();  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // 🔹 LOGIN REQUEST
        const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
    });
        localStorage.setItem("token", res.data.token);
        setMessage(res.data.message);
        setMessageType("success");

// Save token to localStorage
if (res.data.token) {
  localStorage.setItem("authToken", res.data.token);
}

    setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        // 🔹 REGISTER REQUEST
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
       setMessage(res.data.message);
        setMessageType("success");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
      setMessageType("error");
    }
  };

  return (
    <div className="auth-container">
       <button className="back-btn" onClick={() => navigate("/")}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
     
      <div className="auth-box">
        
        <div className="welcome-section">
         
          <h2>Hello, Welcome!</h2>
          <p>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <button
            className="switch-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
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

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            {isLogin && (
              <a href="#" className="forgot-link">
                Forgot Password?
              </a>
            )}
            <button type="submit" className="main-btn">
              {isLogin ? "Login" : "Create Account"}
            </button>
 
            
            

              <>
                <p className="social-text">or login with social platforms</p>
                <div className="social-btns">
                  <button><i className="fa-brands fa-google"></i></button>
                  <button><i className="fa-brands fa-facebook"></i></button>
                  <button><i className="fa-brands fa-apple"></i></button>
                </div>
              </>
        
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;