// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaHome, FaCog, FaPhone, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

// function Dashboard() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("No token found. Please login again.");
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:5000/api/dashboard/user", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUser(res.data.user);
//       } catch (err) {
//         console.error(err);
//         alert(err.response?.data?.message || "Unauthorized");
//       }
//     };

//     fetchDashboard();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-indigo-700 text-white flex flex-col p-6 shadow-lg">
//         <h2 className="text-2xl font-bold mb-10 text-center">📚 Dashboard</h2>

//         <nav className="flex flex-col gap-6">
//           <a href="#" className="flex items-center gap-3 hover:bg-indigo-600 px-3 py-2 rounded-md transition">
//             <FaHome /> Home
//           </a>
//           <a href="#" className="flex items-center gap-3 hover:bg-indigo-600 px-3 py-2 rounded-md transition">
//             <FaCog /> Settings
//           </a>
//           <a href="#" className="flex items-center gap-3 hover:bg-indigo-600 px-3 py-2 rounded-md transition">
//             <FaPhone /> Contact
//           </a>
//         </nav>

//         <div className="mt-auto">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 hover:bg-red-600 bg-red-500 w-full text-left px-3 py-2 rounded-md mt-10 transition"
//           >
//             <FaSignOutAlt /> Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-10">
//         {user ? (
//           <div className="bg-white rounded-2xl shadow-md p-10 flex flex-col items-center">
//             <FaUserCircle className="text-6xl text-indigo-600 mb-4" />
//             <h1 className="text-3xl font-semibold text-gray-800">
//               Welcome, <span className="text-indigo-600">{user.name}</span>!
//             </h1>
//             <p className="text-gray-600 mt-2">Email: {user.email}</p>
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;







import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaHome,
  FaQrcode,
  FaUser,
  FaRobot,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa";
import "./dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login again.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Unauthorized");
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signup";
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Close Button */}
        <button onClick={() => setIsOpen(false)} className="close-btn">
          ✕
        </button>

        {/* Sidebar Menu */}
        <div className="sidebar-menu">
          <SidebarItem icon={<FaHome />} label="Home" />
          <SidebarItem icon={<FaQrcode />} label="Scan Product" />
          <SidebarItem icon={<FaUser />} label="My Profile" />
          <SidebarItem icon={<FaRobot />} label="AI Assistant" />
          <SidebarItem icon={<FaBook />} label="Learn" />
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Menu (Bars) Button */}
        <button onClick={() => setIsOpen(true)} className="menu-btn">
          <FaBars />
        </button>

        {/* Dashboard Card */}
        {user ? (
          <div className="dashboard-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="User Avatar"
            />
            <h1>
              Welcome, <span>{user.name}</span> 👋
            </h1>
            <p>Email: {user.email}</p>
            <p>You’re now logged in to your Food Allergen & Sensitivity Scanner Dashboard.</p>
          </div>
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </div>
    </div>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <div className="sidebar-item">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default Dashboard;
