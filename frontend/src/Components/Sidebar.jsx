import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaBolt,
  FaHistory,
  FaFileAlt,
  FaRobot,
  FaBook,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import "./sidebar.css";
import logo from "../assets/Final Logo.png";

const Sidebar = ({
  isOpen,
  setActivePage,
  handleLogout,
  toggleSidebar, // Parent toggler
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);



  // Detect screen width changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { label: "Home", icon: <FaHome /> , path:"/dashboard"},
    { label: "My Profile", icon: <FaUser />,path:"/dashboard/myprofile" },
    { label: "Quick Scan", icon: <FaBolt /> },
    { label: "Scan History", icon: <FaHistory /> },
    { label: "Reports", icon: <FaFileAlt /> },
    { label: "AI Assistant", icon: <FaRobot /> },
    { label: "Learn", icon: <FaBook /> },
  ];

  // Handle menu clicks — close sidebar immediately
  const handleMenuClick = (page) => {
    setActivePage(page);
    toggleSidebar(false); // Close sidebar after click
  };

  const handleLogoutClick = () => {
    try {
      handleLogout(); // remove token etc.
      toggleSidebar(false);
      // Small delay ensures sidebar closes before redirect
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    } catch (err) {
      console.error("Logout failed:", err);
      window.location.href = "/";
    }
  };

  const handleOverlayClick = () => {
    toggleSidebar(false);
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo-wrapper">
            <img
              src={logo}
              alt="AllerScan Logo"
              className="sidebar-logo"
            />
          </div>
          <h2 className="sidebar-title">AllerScan</h2>

    

          {/* Close Button (Mobile Only) */}
          {isMobile && (
            <button
              className="inside-sidebar"
              onClick={() => toggleSidebar(false)}
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Sidebar Menu */}
        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="sidebar-item"
              onClick={() => handleMenuClick(item.label)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogoutClick}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay (click to close) */}
      {isOpen && (
        <div
          className={`sidebar-overlay ${isOpen ? "active" : ""}`}
          onClick={handleOverlayClick}
        />
      )}
    </>
  );
};

export default Sidebar;