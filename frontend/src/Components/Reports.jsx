import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Reports.css";

const Reports = () => {
  const [scanHistory, setScanHistory] = useState([]);
  const [summary, setSummary] = useState({
    totalScans: 0,
    safeFoods: 0,
    riskAlerts: 0,
  });
  const [weeklyData, setWeeklyData] = useState([]);
  const [foodData, setFoodData] = useState([]);

  // 🔹 Helper: compute weekly trend from scan dates
  const computeWeeklyData = (scans) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyCount = days.map((d) => ({ day: d, scans: 0 }));
    scans.forEach((scan) => {
      const day = new Date(scan.dateTime).getDay();
      weeklyCount[day].scans += 1;
    });
    return weeklyCount;
  };

  // 🔹 Helper: compute category safe vs unsafe
  const computeFoodData = (scans) => {
    const categories = {
      Snacks: 0,
      Dairy: 0,
      Grains: 0,
      Proteins: 0,
      Beverages: 0,
    };

    const safe = { ...categories };
    const unsafe = { ...categories };

    scans.forEach((s) => {
      const item = s.foodItem.toLowerCase();
      let category = "Snacks";
      if (item.includes("milk") || item.includes("cheese")) category = "Dairy";
      else if (item.includes("rice") || item.includes("bread")) category = "Grains";
      else if (item.includes("chicken") || item.includes("egg")) category = "Proteins";
      else if (item.includes("juice") || item.includes("tea")) category = "Beverages";

      if (s.safetyStatus === "Safe") safe[category] += 1;
      else unsafe[category] += 1;
    });

    return Object.keys(categories).map((cat) => ({
      category: cat,
      safe: safe[cat],
      unsafe: unsafe[cat],
    }));
  };

  const loadReportsData = () => {
    const stored = JSON.parse(localStorage.getItem("scanHistory")) || [];
    setScanHistory(stored);

    const totalScans = stored.length;
    const safeFoods = Math.round(
      (stored.filter((s) => s.safetyStatus === "Safe").length / (totalScans || 1)) * 100
    );
    const riskAlerts = stored.filter((s) => s.safetyStatus === "Risk").length;

    setSummary({ totalScans, safeFoods, riskAlerts });
    setWeeklyData(computeWeeklyData(stored));
    setFoodData(computeFoodData(stored));
  };

  useEffect(() => {
    loadReportsData();
    const updateHandler = () => loadReportsData();
    window.addEventListener("scan-updated", updateHandler);
    return () => window.removeEventListener("scan-updated", updateHandler);
  }, []);

  return (
    <div className="reports-container">
      <h1 className="reports-title">Reports & Analytics</h1>
      <p className="reports-subtitle">Insights into your scanning patterns</p>

      {/* Summary Cards */}
      <div className="reports-cards">
        <div className="report-card">
          <p className="card-label">Total Scans</p>
          <h2 className="card-value">{summary.totalScans}</h2>
        </div>

        <div className="report-card">
          <p className="card-label">Safe Foods</p>
          <h2 className="card-value success">{summary.safeFoods}%</h2>
        </div>

        <div className="report-card">
          <p className="card-label">Risk Alerts</p>
          <h2 className="card-value danger">{summary.riskAlerts}</h2>
        </div>
      </div>

      {/* Weekly Scan Activity */}
      <div className="chart-card">
        <h3>Weekly Scan Activity</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="scans" stroke="#2e7d32" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Food Category Safe vs Unsafe */}
      <div className="chart-card full-width">
        <h3>Food Categories (Safe vs Unsafe)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={foodData}
            margin={{ top: 20, right: 20, left: 0, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              interval={0}
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis />
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ marginTop: 10 }}
            />
            <Bar dataKey="safe" fill="#2e7d32" name="Safe" />
            <Bar dataKey="unsafe" fill="#e53935" name="Unsafe" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
