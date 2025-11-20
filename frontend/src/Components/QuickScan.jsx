import React, { useState, useEffect } from "react";
import "./QuickScan.css";
import API from "../api/api.js";
import toast from "react-hot-toast";

const QuickScan = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanResultText, setScanResultText] = useState("");
  const [safetyPercent, setSafetyPercent] = useState(null);
  const [detectedAllergens, setDetectedAllergens] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [alternatives, setAlternatives] = useState({});
  const [userAllergens, setUserAllergens] = useState([]);

  useEffect(() => {
    const fetchUserAllergens = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allergens = res.data.foods?.map((f) => f.allergen) || [];
        setUserAllergens(allergens);
      } catch (err) {
        console.error("❌ Failed to fetch user allergens:", err);
      }
    };
    fetchUserAllergens();
  }, []);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      setScanned(false);
      setScanResultText("");
      setSafetyPercent(null);
      setDetectedAllergens([]);
      setIngredients([]);
      setAlternatives({});
    }
  };

  const handleReupload = () => {
    setUploadedImage(null);
    setScanned(false);
    setScanResultText("");
    setSafetyPercent(null);
    setDetectedAllergens([]);
    setIngredients([]);
    setAlternatives({});
  };

  const handleScan = async () => {
    if (!uploadedImage) return;
    setLoading(true);
    setScanResultText("Analyzing image...");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", uploadedImage);

      const resp = await fetch("https://alleregen-scanner-app.onrender.com/api/scan", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Scan failed");

      const scannedIngredients = data.ingredients || [];
      setIngredients(scannedIngredients);

      // 🔹 Improved normalization for plural & case-insensitive matching
      const normalize = (str) =>
        str.toLowerCase().trim().replace(/s$/,""); // removes trailing 's'

      const normalizedIngredients = scannedIngredients.map(normalize);
      const normalizedUserAllergens = userAllergens.map(normalize);

      const matched = normalizedUserAllergens.filter((allergen) =>
        normalizedIngredients.some((ing) => ing.includes(allergen))
      );

      setDetectedAllergens(matched);

      // 🔹 Set safety: any allergen = Risk
      const safety = matched.length === 0 ? 100 : 0; 
      setSafetyPercent(safety);

      const allergenAlternatives = {
        dairy: ["soy milk", "almond cheese"],
        soy: ["pea protein", "coconut aminos"],
        peanuts: ["almond butter", "sunflower seeds"],
        "tree nuts": ["seeds", "legume butter"],
        shellfish: ["chicken", "tofu"],
        sugar: ["stevia", "monk fruit"],
        maggies: ["other instant noodles"],
        egg: ["egg substitute", "tofu scramble"], // add egg alternatives
      };

      const matchedAlternatives = {};
      matched.forEach((a) => {
        if (allergenAlternatives[a.toLowerCase()]) {
          matchedAlternatives[a] = allergenAlternatives[a.toLowerCase()];
        }
      });
      setAlternatives(matchedAlternatives);

      setScanResultText(
        matched.length > 0
          ? "High Risk ⚠️ Contains allergens"
          : "Analysis complete ✅ Safe to consume"
      );

      const imageBase64 = await toBase64(uploadedImage);

      const newScan = {
        foodItem: uploadedImage.name || "Unknown Food",
        allergens: matched,
        safetyStatus: matched.length > 0 ? "Risk" : "Safe",
        safetyPercent: safety,
        dateTime: new Date().toISOString(),
        image: imageBase64,
      };

      const existing = JSON.parse(localStorage.getItem("scanHistory")) || [];
      const updated = [newScan, ...existing].slice(0, 8); // store only last 8 scans
      localStorage.setItem("scanHistory", JSON.stringify(updated));

      window.dispatchEvent(new Event("scan-updated"));
      toast.success("Scan saved to history ✅");
    } catch (err) {
      console.error("❌ Scan failed:", err);
      setScanResultText("Error analyzing image.");
      toast.error("Failed to analyze image");
    } finally {
      setLoading(false);
      setScanned(true);
    }
  };

  return (
    <div className="quickscan-container">
      <h1 className="title">Quick Scan</h1>

 {/* Upload Section */}
{!uploadedImage && (
  <div className="quick-scan-container">
    <p className="subtitle">Upload an image to check for allergens</p>

    <div className="upload-card-container">
      <label className="upload-card">
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          hidden
        />

        <div className="upload-inner">
          {/* Removed upload-icon */}

          <p className="upload-text">Drop your file here</p>
          <p className="upload-subtext">or click to browse from your device</p>

          <div className="button-row">
            <button
              type="button"
              className="btn upload-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                document.querySelector(".upload-card input").click();
              }}
            >
              Upload Your Image
            </button>
          </div>

          <p className="file-info">
            Supported formats: JPG, PNG
          </p>
        </div>
      </label>
    </div>
  </div>
)}



      {/* Image preview before scan */}
      {uploadedImage && !scanned && (
        <div className="upload-section card">
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="preview"
            className="preview-img"
          />
          <div className="btn-group">
            <button
              className="primary-btn"
              onClick={handleScan}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
            <button className="secondary-btn" onClick={handleReupload}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Scan results */}
      {scanned && (
        <div className="result-section card">
          <h3 className="result-heading">{scanResultText}</h3>

          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="scanned"
            className="preview-img"
          />

          <div className="cards-grid">
            {/* Ingredients */}
            <div className="result-card">
              <h4>Ingredients Detected</h4>
              {ingredients.length ? (
                <ul>{ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
              ) : (
                <p>No ingredients detected</p>
              )}
            </div>

            {/* Allergens */}
            <div className="result-card">
              <h4>Matched Allergens</h4>
              {detectedAllergens.length ? (
                <ul>{detectedAllergens.map((a, idx) => <li key={idx}>{a}</li>)}</ul>
              ) : (
                <p>No matched allergens</p>
              )}
            </div>

            {/* Safety */}
            <div className="result-card safety-card">
              <h4>Safety</h4>
              {safetyPercent !== null ? (
                <div
                  className={`safety-circle ${
                    safetyPercent === 100
                      ? "safe"
                      : "unsafe"
                  }`}
                >
                  {safetyPercent}%
                </div>
              ) : (
                <p>Not available</p>
              )}
            </div>

            {/* Alternatives */}
            {Object.keys(alternatives).length > 0 && (
              <div className="result-card">
                <h4>Alternatives</h4>
                {Object.entries(alternatives).map(([alg, list]) => (
                  <div key={alg} className="alt-item">
                    <strong>{alg}</strong>
                    <ul>{list.map((alt, i) => <li key={i}>{alt}</li>)}</ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="scan-again">
            <button className="primary-btn" onClick={handleReupload}>
              Scan Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickScan;
