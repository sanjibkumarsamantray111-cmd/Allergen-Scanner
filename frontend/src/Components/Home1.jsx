// // import React, { useState, useEffect } from "react";
// import "./home1.css";
// import heroBg from "../assets/Gemini_Generated_Image_wwxt2mwwxt2mwwxt.png";
// import profileLogo from "../assets/Final Logo.png";
// import { FaUserEdit, FaTimes } from "react-icons/fa";
// import { useState ,useEffect } from "react";

// export default function Home1({ user }) {
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowPopup(true);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleProfileSetup = () => {
//     window.location.href = "/myprofile"; // Redirect to My Profile page
//   };

//   return (
//     <div
//       className="home1-container"
//       style={{
//         backgroundImage: `url(${heroBg})`,
//       }}
//     >
//       {/* ===== HEADER ===== */}
//       <header className="home1-header glass-bg fade-in">
//         <div className="header-left">
//           <h1>
//             Welcome Back,{" "}
//             <span>{user?.name || user?.username || "User"}</span> 👋
//           </h1>
//           <p>Your personalized Allergen & Sensitivity Dashboard</p>
//         </div>
//         <div className="header-right">
//           <img src={profileLogo} alt="Profile" className="profile-logo" />
//         </div>
//       </header>

//       {/* ===== POPUP ===== */}
//       {showPopup && (
//         <div className="profile-popup-overlay">
//           <div className="profile-popup glass-bg">
//             <button
//               className="close-popup"
//               onClick={() => setShowPopup(false)}
//             >
//               <FaTimes />
//             </button>
//             <FaUserEdit className="popup-icon" />
//             <h2>Set Up Your Profile</h2>
//             <p>
//               We're excited to have you here! Let's set up your profile to
//               personalize your allergen scanning experience and keep your food
//               safe.
//             </p>
//             <button className="setup-btn" onClick={handleProfileSetup}>
//               Go to My Profile
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }









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
  FaClock 
} from "react-icons/fa";

export default function Home1({ user }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Sample data for dashboard stats
  const [dashboardStats] = useState({
    totalScans: { count: 1247, change: "+12.5%", label: "vs last month" },
    allergensDetected: { count: 23, change: "-8.3%", label: "vs last month" },
    safeFoods: { percentage: "94.2%", change: "+3.1%", label: "vs last month" },
    riskAlerts: { count: 5, change: "-2", label: "vs last month" }
  });

  // Sample data for recent scan history
  const [recentScans] = useState([
    {
      id: 1,
      foodItem: "Almond Milk",
      allergens: ["Tree Nuts"],
      safetyStatus: "Unsafe",
      safetyPercentage: 45,
      date: "Oct 31, 2025 10:23 AM"
    },
    {
      id: 2,
      foodItem: "Gluten-Free Bread",
      allergens: ["None"],
      safetyStatus: "Safe",
      safetyPercentage: 98,
      date: "Oct 31, 2025 09:15 AM"
    },
    {
      id: 3,
      foodItem: "Protein Bar",
      allergens: ["Peanuts", "Soy"],
      safetyStatus: "Moderate",
      safetyPercentage: 62,
      date: "Oct 30, 2025 04:45 PM"
    },
    {
      id: 4,
      foodItem: "Greek Yogurt",
      allergens: ["Dairy"],
      safetyStatus: "Unsafe",
      safetyPercentage: 35,
      date: "Oct 30, 2025 02:30 PM"
    },
    {
      id: 5,
      foodItem: "Mixed Nuts",
      allergens: ["Tree Nuts", "Peanuts"],
      safetyStatus: "Unsafe",
      safetyPercentage: 20,
      date: "Oct 29, 2025 08:15 PM"
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleProfileSetup = () => {
    setShowPopup(false);
    navigate("/myprofile");
  };

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
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* ===== HEADER ===== */}
      <header className="home1-header glass-bg fade-in">
        <div className="header-left">
          <h1>
            Welcome back, <span>{user?.name || user?.username || "Sarah"}</span>! 👋
          </h1>
          <p>Here's your allergen safety overview for today</p>
        </div>
        <img src={profileLogo} alt="Logo" className="profile-logo" />
      </header>

      {/* ===== DASHBOARD STATS CARDS ===== */}
      <div className="stats-grid fade-in">
        {/* Total Scans Card */}
        <div className="stat-card glass-bg">
          <div className="stat-header">
            <div className="stat-info">
              <h3>Total Scans</h3>
              <div className="stat-value">
                {dashboardStats.totalScans.count.toLocaleString()}
              </div>
              <div className="stat-change positive">
                {dashboardStats.totalScans.change}{" "}
                <span>{dashboardStats.totalScans.label}</span>
              </div>
            </div>
            <div className="stat-icon scan-icon">
              <FaQrcode />
            </div>
          </div>
        </div>

        {/* Allergens Detected Card */}
        <div className="stat-card glass-bg">
          <div className="stat-header">
            <div className="stat-info">
              <h3>Allergens Detected</h3>
              <div className="stat-value">
                {dashboardStats.allergensDetected.count}
              </div>
              <div className="stat-change negative">
                {dashboardStats.allergensDetected.change}{" "}
                <span>{dashboardStats.allergensDetected.label}</span>
              </div>
            </div>
            <div className="stat-icon allergen-icon">
              <FaExclamationTriangle />
            </div>
          </div>
        </div>

        {/* Safe Foods Card */}
        <div className="stat-card glass-bg">
          <div className="stat-header">
            <div className="stat-info">
              <h3>Safe Foods</h3>
              <div className="stat-value">
                {dashboardStats.safeFoods.percentage}
              </div>
              <div className="stat-change positive">
                {dashboardStats.safeFoods.change}{" "}
                <span>{dashboardStats.safeFoods.label}</span>
              </div>
            </div>
            <div className="stat-icon safe-icon">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        {/* Risk Alerts Card */}
        <div className="stat-card glass-bg">
          <div className="stat-header">
            <div className="stat-info">
              <h3>Risk Alerts</h3>
              <div className="stat-value">
                {dashboardStats.riskAlerts.count}
              </div>
              <div className="stat-change negative">
                {dashboardStats.riskAlerts.change}{" "}
                <span>{dashboardStats.riskAlerts.label}</span>
              </div>
            </div>
            <div className="stat-icon risk-icon">
              <FaChartLine />
            </div>
          </div>
        </div>
      </div>

      {/* ===== RECENT SCAN HISTORY SECTION ===== */}
      <div className="scan-history-section glass-bg fade-in">
        <div className="section-header">
          <div>
            <h2>Recent Scan History</h2>
            <p>Your latest allergen scans</p>
          </div>
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
              {recentScans.map((scan) => (
                <tr key={scan.id}>
                  <td className="food-item-cell">
                    <span className="food-name">{scan.foodItem}</span>
                  </td>
                  <td className="allergens-cell">
                    {scan.allergens.map((allergen, index) => (
                      <span
                        key={index}
                        className={`allergen-tag ${
                          allergen === "None" ? "none-tag" : ""
                        }`}
                      >
                        {allergen}
                      </span>
                    ))}
                  </td>
                  <td className="status-cell">
                    <span
                      className={`safety-badge ${getSafetyStatusClass(
                        scan.safetyStatus
                      )}`}
                    >
                      {getSafetyIcon(scan.safetyStatus)}
                      <span>
                        {scan.safetyStatus} ({scan.safetyPercentage}%)
                      </span>
                    </span>
                  </td>
                  <td className="date-cell">
                    <FaClock className="clock-icon" />
                    <span>{scan.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== PROFILE SETUP POPUP ===== */}
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
              Complete your profile to personalize allergen detection and make your dashboard truly yours.
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