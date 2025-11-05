import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home1.css";
import heroBg from "../assets/Gemini_Generated_Image_wwxt2mwwxt2mwwxt.png";
import profileLogo from "../assets/Final Logo.png";
import {
  FaUserEdit,
  FaTimes,
  FaQrcode,
  FaExclamationTriangle,
  FaCheckCircle,
  FaChartLine,
  FaClock,
} from "react-icons/fa";

export default function Home1({ user }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [recentScans, setRecentScans] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalScans: 0,
    allergensDetected: 0,
    safeFoods: 0,
    riskAlerts: 0,
  });

  // ✅ Load scan data dynamically from localStorage
  const fetchScanData = () => {
    const stored = JSON.parse(localStorage.getItem("scanHistory")) || [];
    setRecentScans(stored.slice(-5).reverse());

    // Calculate stats dynamically
    const total = stored.length;
    const allergens = stored.filter(
      (s) => s.allergens?.length > 0 && s.allergens[0] !== "None"
    ).length;
    const safeFoods = Math.round(
      (stored.filter((s) => s.safetyStatus === "Safe").length / (total || 1)) *
        100
    );
    const risks = stored.filter((s) => s.safetyStatus === "Unsafe").length;

    setDashboardStats({
      totalScans: total,
      allergensDetected: allergens,
      safeFoods,
      riskAlerts: risks,
    });
  };

  // ✅ Update when data changes
  useEffect(() => {
    fetchScanData();
    window.addEventListener("scan-updated", fetchScanData);
    return () => window.removeEventListener("scan-updated", fetchScanData);
  }, []);

  // ✅ Show profile popup once per user
  useEffect(() => {
    const userId = user?.id || user?.email || "guest";
    const popupKey = `hasSeenProfilePopup_${userId}`;
    const hasSeenPopup = localStorage.getItem(popupKey);

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem(popupKey, "true");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleProfileSetup = () => {
    setShowPopup(false);
    setTimeout(() => navigate("/myprofile"), 300);
  };

  // ✅ Utility functions
  const getSafetyStatusClass = (status) => {
    switch (status) {
      case "Safe":
        return "status-safe";
      case "Moderate":
        return "status-moderate";
      case "Unsafe":
        return "status-unsafe";
      default:
        return "";
    }
  };

  const getSafetyIcon = (status) => {
    switch (status) {
      case "Safe":
        return <FaCheckCircle />;
      case "Moderate":
        return <FaExclamationTriangle />;
      case "Unsafe":
        return <FaTimes />;
      default:
        return null;
    }
  };

  return (
    <div
      className="home1-container"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* ===== HEADER ===== */}
      <header className="home1-header glass-bg fade-in">
        <div className="header-left">
          <h1>
            Welcome, <span>{user?.name || user?.username || "User"}</span> 👋
          </h1>
          <p>Here's your allergen safety overview for today</p>
        </div>
        <img src={profileLogo} alt="Logo" className="profile-logo" />
      </header>

      {/* ===== DASHBOARD STATS ===== */}
      <div className="stats-grid fade-in">
        <div className="stat-card glass-bg">
          <div className="stat-header">
            <div className="stat-info">
              <h3>Total Scans</h3>
              <div className="stat-value">{dashboardStats.totalScans}</div>
            </div>
            <div className="stat-icon scan-icon">
              <FaQrcode />
            </div>
          </div>
        </div>

        <div className="stat-card glass-bg">
          <div className="stat-header">
            <div className="stat-info">
              <h3>Allergens Detected</h3>
              <div className="stat-value">{dashboardStats.allergensDetected}</div>
            </div>
            <div className="stat-icon allergen-icon">
              <FaExclamationTriangle />
            </div>
          </div>
        </div>

        <div className="stat-card glass-bg">
          <div className="stat-header">
            <div className="stat-info">
              <h3>Safe Foods</h3>
              <div className="stat-value">{dashboardStats.safeFoods}%</div>
            </div>
            <div className="stat-icon safe-icon">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        <div className="stat-card glass-bg">
          <div className="stat-header">
            <div className="stat-info">
              <h3>Risk Alerts</h3>
              <div className="stat-value">{dashboardStats.riskAlerts}</div>
            </div>
            <div className="stat-icon risk-icon">
              <FaChartLine />
            </div>
          </div>
        </div>
      </div>

      {/* ===== RECENT SCAN HISTORY ===== */}
      <div className="scan-history-section glass-bg fade-in">
        <div className="section-header">
          <h2>Recent Scan History</h2>
          <p>Your latest allergen scans</p>
        </div>

        <div className="scan-table-container">
          <table className="scan-table">
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Allergens</th>
                <th>Safety Status</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No recent scans found
                  </td>
                </tr>
              ) : (
                recentScans.map((scan, index) => (
                  <tr key={index}>
                    <td>{scan.foodItem}</td>
                    <td>
                      {scan.allergens?.length
                        ? scan.allergens.join(", ")
                        : "None"}
                    </td>
                    <td>
                      <span
                        className={`safety-badge ${getSafetyStatusClass(
                          scan.safetyStatus
                        )}`}
                      >
                        {getSafetyIcon(scan.safetyStatus)} {scan.safetyStatus} (
                        {scan.safetyPercent || 0}%)
                      </span>
                    </td>
                    <td>
                      {new Date(scan.dateTime).toLocaleString("en-IN", {
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== PROFILE POPUP ===== */}
      {showPopup && (
        <div className="profile-popup-overlay">
          <div className="profile-popup glass-bg">
            <button
              className="close-popup"
              onClick={() => setShowPopup(false)}
            >
              <FaTimes />
            </button>
            <FaUserEdit className="popup-icon" />
            <h2>Set Up Your Profile</h2>
            <p>
              Complete your profile to personalize allergen detection and make
              your dashboard truly yours.
            </p>
            <button className="setup-btn" onClick={handleProfileSetup}>
              Go to My Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
