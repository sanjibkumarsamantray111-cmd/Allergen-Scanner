import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBolt,
  FaHistory,
  FaFileAlt,
  FaRobot,
  FaBook,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBoxOpen,
  FaHandHolding,
} from "react-icons/fa";
import "./sidebar.css";
import logo from "../assets/Final Logo.png";

const Sidebar = ({ isOpen, setActivePage, handleLogout, toggleSidebar }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleSidebar]);

  const menuItems = [
    { label: "Home", icon: <FaHome />, path: "/home" },
    { label: "My Profile", icon: <FaUser />, path: "/my-profile" },
    { label: "Quick Scan", icon: <FaBolt />, path: "/quick-scan" },
    { label: "Scan History", icon: <FaHistory />, path: "/scan-history" },
    { label: "Reports", icon: <FaFileAlt />, path: "/reports" },
    { label: "AI Assistant", icon: <FaRobot />, path: "/assistant" },
    { label: "Learn", icon: <FaBook />, path: "/learn" },
    { label: "Subscription", icon: <FaHandHolding />, path: "/subscription" },
  ];

  const handleMenuClick = (page, path) => {
    setActivePage(page);
    navigate(path);
    toggleSidebar(false);
  };

  const handleLogoutClick = () => {
    // Clear auth
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (handleLogout) handleLogout();

    
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`sidebar-toggle ${isOpen ? "active" : ""}`}
        onClick={() => toggleSidebar(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${isOpen ? "open" : "closed"}`}
        style={{ pointerEvents: isOpen ? "auto" : "none" }} // Prevent click during closed state
      >
        <div className="sidebar-header">
          <div className="sidebar-logo-wrapper">
            <img src={logo} alt="AllerScan Logo" className="sidebar-logo" />
          </div>
          <h2 className="sidebar-title">AllerScan</h2>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="sidebar-item"
              onClick={() => handleMenuClick(item.label, item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogoutClick}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div
          className="sidebar-overlay active"
          onClick={() => toggleSidebar(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
