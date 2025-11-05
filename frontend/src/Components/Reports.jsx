import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import "./Reports.css";

const Reports = () => {
  const [scanHistory, setScanHistory] = useState([]);
  const [summary, setSummary] = useState({
    totalScans: 0,
    allergensDetected: 0,
    safeFoods: 0,
    riskAlerts: 0,
  });
  const [weeklyData, setWeeklyData] = useState([]);
  const [allergenData, setAllergenData] = useState([]);
  const [foodData, setFoodData] = useState([]);

  const COLORS = ["#A8E6CF", "#56CC9D", "#FFD166", "#FFB347", "#FF9AA2"];

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

  // 🔹 Helper: compute allergen frequency
  const computeAllergenData = (scans) => {
    const counts = {};
    scans.forEach((s) => {
      s.allergens?.forEach((a) => {
        counts[a] = (counts[a] || 0) + 1;
      });
    });

    const entries = Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));

    if (entries.length === 0) {
      return [{ name: "No Allergens", value: 1 }];
    }

    return entries;
  };

  // 🔹 Helper: compute category safe vs unsafe (based on foodItem keywords)
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

  // 🔹 Load and process data
  const loadReportsData = () => {
    const stored = JSON.parse(localStorage.getItem("scanHistory")) || [];
    setScanHistory(stored);

    const totalScans = stored.length;
    const allergensDetected = stored.filter((s) => s.allergens?.length > 0).length;
    const safeFoods = Math.round(
      (stored.filter((s) => s.safetyStatus === "Safe").length / (totalScans || 1)) * 100
    );
    const riskAlerts = stored.filter((s) => s.safetyStatus === "Risk").length;

    setSummary({ totalScans, allergensDetected, safeFoods, riskAlerts });
    setWeeklyData(computeWeeklyData(stored));
    setAllergenData(computeAllergenData(stored));
    setFoodData(computeFoodData(stored));
  };

  useEffect(() => {
    loadReportsData();

    // 🔄 Auto-refresh on scan updates
    const updateHandler = () => {
      console.log("📊 Reports updated from new scan");
      loadReportsData();
    };
    window.addEventListener("scan-updated", updateHandler);
    return () => window.removeEventListener("scan-updated", updateHandler);
  }, []);

  return (
    <div className="reports-container">
      <h1 className="reports-title">Reports & Analytics</h1>
      <p className="reports-subtitle">
        Detailed insights into your allergen scanning patterns
      </p>

      {/* Summary Cards */}
      <div className="reports-cards">
        <div className="report-card">
          <p className="card-label">Total Scans</p>
          <h2 className="card-value">{summary.totalScans}</h2>
          <p className="card-change positive">Live data</p>
        </div>

        <div className="report-card">
          <p className="card-label">Allergens Detected</p>
          <h2 className="card-value warning">{summary.allergensDetected}</h2>
          <p className="card-change negative">Auto-updating</p>
        </div>

        <div className="report-card">
          <p className="card-label">Safe Foods</p>
          <h2 className="card-value success">{summary.safeFoods}%</h2>
          <p className="card-change positive">Healthy choices</p>
        </div>

        <div className="report-card">
          <p className="card-label">Risk Alerts</p>
          <h2 className="card-value danger">{summary.riskAlerts}</h2>
          <p className="card-change negative">Monitor closely</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="chart-section">
        <div className="chart-card">
          <h3>Weekly Scan Activity</h3>
          <LineChart width={400} height={200} data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="scans"
              stroke="#2e7d32"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </div>

        <div className="chart-card">
          <h3>Allergen Distribution</h3>
          <PieChart width={400} height={200}>
            <Pie
              data={allergenData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
            >
              {allergenData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Food Category Chart */}
      <div className="chart-card full-width">
        <h3>Food Categories (Safe vs Unsafe)</h3>
        <BarChart width={800} height={300} data={foodData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="safe" fill="#2e7d32" name="Safe" />
          <Bar dataKey="unsafe" fill="#e53935" name="Unsafe" />
        </BarChart>
      </div>
    </div>
  );
};

export default Reports;
