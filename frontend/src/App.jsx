import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import FAQSection from "./Components/FAQsection";
import TermsOfUse from "./Components/TermsOfUse";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import AboutAllergens from "./Components/AboutAllergens";
import FoodSafety from "./Components/FoodSafety";
import AuthModal from "./Components/AuthModal";
import { Toaster } from "react-hot-toast";

function AppWrapper() {
  const location = useLocation();
  const background = location.state?.backgroundLocation;

  const [token, setToken] = useState(localStorage.getItem("token"));

  // Listen for token changes (login/logout)
  useEffect(() => {
    const handleStorageChange = () =>
      setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Update token from AuthModal
  const updateToken = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const PrivateRoute = ({ children }) =>
    token ? children : <Navigate to="/" />;

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: "#333", color: "#fff", borderRadius: "8px" },
        }}
      />

      {/* Main Routes */}
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQSection />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about-allergens" element={<AboutAllergens />} />
        <Route path="/food-safety" element={<FoodSafety />} />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Dashboard onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Auth Modal Overlay */}
      {background && (
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthModal
                updateToken={updateToken}
                closeModal={() => window.history.back()}
              />
            }
          />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
