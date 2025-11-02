import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Home1 from "./Home1";
import MyProfile from "./MyProfile";
import QuickScan from "./QuickScan";
import ScanHistory from "./ScanHistory";
import Reports from "./Reports";
import AIAssistant from "./AIAssistant";
import Learn from "./Learn";
import { FaBars } from "react-icons/fa";
import "./dashboard.css";
import heroBg from "../assets/Gemini_Generated_Image_wwxt2mwwxt2mwwxt.png";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [activePage, setActivePage] = useState("Home");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detect screen size to adjust sidebar behavior
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/"; // redirect to home if no token
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const userData = res.data.user;
      setUser(userData);

    //   // ✅ Auto-redirect to My Profile if profile incomplete
      if (!userData.age || !userData.allergens?.length) {
        setActivePage("Home");
      } else {
        setActivePage("My Profile");
      }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };

    fetchDashboard();
  }, []);

  // Logout handler — clear token and redirect to landing page
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Menu content rendering
  const renderContent = () => {
    switch (activePage) {
      case "Home":
        return <Home1 user={user} />;
      case "My Profile":
        return <MyProfile user={user} />;
      case "Quick Scan":
        return <QuickScan />;
      case "Scan History":
        return <ScanHistory />;
      case "Reports":
        return <Reports />;
      case "AI Assistant":
        return <AIAssistant />;
      case "Learn":
        return <Learn />;
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  // Toggle sidebar open/close
  const toggleSidebar = (forceValue = null) => {
    setIsOpen(forceValue !== null ? forceValue : !isOpen);
  };

  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        setActivePage={(page) => {
          setActivePage(page);
          if (isMobile) toggleSidebar(false); // auto-close on mobile
        }}
        handleLogout={handleLogout}
        toggleSidebar={toggleSidebar}
      />

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="sidebar-overlay active"
          onClick={() => toggleSidebar(false)}
        ></div>
      )}

      {/* Hamburger button */}
      <button
        onClick={() => toggleSidebar()}
        className="menu-btn"
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>

      {/* Main content */}
      <main
        className={`main-content ${
          !isMobile && isOpen ? "sidebar-shift" : ""
        }`}
      >
        {user ? renderContent() : <p className="loading-text">Loading...</p>}
      </main>
    </div>
  );
}

export default Dashboard;




