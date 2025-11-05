import { useEffect, useState } from "react";
import "./ScanHistory.css";

export default function ScanHistory() {
  const [scans, setScans] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("scanHistory")) || [];

      // ✅ Keep all valid scans that have at least a timestamp
      const validScans = stored.filter((s) => s.dateTime);

      console.log("📦 Loaded scans:", validScans);
      setScans(validScans);

      // ✅ Compute summary stats
      const totalScans = validScans.length;
      const allergensDetected = validScans.filter(
        (s) => s.allergens?.length > 0
      ).length;
      const safeFoods = Math.round(
        (validScans.filter((s) => s.safetyStatus === "Safe").length /
          (totalScans || 1)) *
          100
      );
      const riskAlerts = validScans.filter(
        (s) => s.safetyStatus === "Risk"
      ).length;

      setSummary({ totalScans, allergensDetected, safeFoods, riskAlerts });
    } catch (err) {
      console.error("❌ Error loading history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // ✅ Listen for updates from QuickScan
    const handleUpdate = () => {
      console.log("🔄 Scan history updated event received");
      fetchData();
    };

    window.addEventListener("scan-updated", handleUpdate);
    return () => window.removeEventListener("scan-updated", handleUpdate);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Fetching your scan history...</p>
      </div>
    );
  }

  return (
    <div className="scan-history-container">
      <div className="header-section">
        <div>
          <h2>📊 Scan History</h2>
          <p>All your previous food scan results appear here automatically.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card">
          <p>Total Scans</p>
          <h3>{summary.totalScans || 0}</h3>
        </div>
        <div className="summary-card yellow">
          <p>Allergens Detected</p>
          <h3>{summary.allergensDetected || 0}</h3>
        </div>
        <div className="summary-card green">
          <p>Safe Foods</p>
          <h3>{summary.safeFoods || 0}%</h3>
        </div>
        <div className="summary-card red">
          <p>Risk Alerts</p>
          <h3>{summary.riskAlerts || 0}</h3>
        </div>
      </div>

      {/* Scan History Table */}
      <div className="history-table">
        <h3>Recent Scan History</h3>
        {scans.length === 0 ? (
          <p className="no-scans">No scans available yet. Try scanning a product!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Allergens</th>
                <th>Safety Status</th>
                <th>Safety %</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan, index) => (
                <tr key={index}>
                  <td>{scan.foodItem || "Unknown Food"}</td>
                  <td>
                    {scan.allergens?.length ? scan.allergens.join(", ") : "None"}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        scan.safetyStatus === "Safe"
                          ? "green"
                          : scan.safetyStatus === "Moderate"
                          ? "yellow"
                          : "red"
                      }`}
                    >
                      {scan.safetyStatus}
                    </span>
                  </td>
                  <td>{scan.safetyPercent}%</td>
                  <td>
                    {new Date(scan.dateTime).toLocaleString("en-IN", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
