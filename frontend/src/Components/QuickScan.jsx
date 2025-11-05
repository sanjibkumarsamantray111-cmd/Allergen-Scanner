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

      const resp = await fetch("http://localhost:5000/api/scan", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Scan failed");

      const scannedIngredients = data.ingredients || [];
      setIngredients(scannedIngredients);

      const normalizedIngredients = scannedIngredients.map((i) =>
        i.toLowerCase().trim()
      );
      const normalizedUserAllergens = userAllergens.map((a) =>
        a.toLowerCase().trim()
      );
      const matched = normalizedUserAllergens.filter((allergen) =>
        normalizedIngredients.some((ing) => ing.includes(allergen))
      );
      setDetectedAllergens(matched);

      const safety = matched.length === 0 ? 100 : 50;
      setSafetyPercent(safety);

      const allergenAlternatives = {
        dairy: ["soy milk", "almond cheese"],
        soy: ["pea protein", "coconut aminos"],
        peanuts: ["almond butter", "sunflower seeds"],
        "tree nuts": ["seeds", "legume butter"],
        shellfish: ["chicken", "tofu"],
        sugar: ["stevia", "monk fruit"],
        maggies: ["other instant noodles"],
      };
      const matchedAlternatives = {};
      matched.forEach((a) => {
        if (allergenAlternatives[a.toLowerCase()]) {
          matchedAlternatives[a] = allergenAlternatives[a.toLowerCase()];
        }
      });
      setAlternatives(matchedAlternatives);

      setScanResultText("Analysis complete ✅");
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
      <h1>Quick Scan</h1>

      {!uploadedImage && (
        <div className="upload-section card">
          <label className="upload-btn">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
      )}

      {uploadedImage && !scanned && (
        <div className="upload-section card">
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="preview"
            className="preview-img"
          />
          <div className="btn-group">
            <button onClick={handleScan} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze"}
            </button>
            <button onClick={handleReupload}>Cancel</button>
          </div>
        </div>
      )}

      {scanned && (
        <div className="result-section card">
          <h3>{scanResultText}</h3>
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="scanned"
            className="preview-img"
          />

          <div className="cards-grid">
            <div className="result-card">
              <h4>Ingredients Detected</h4>
              {ingredients.length ? (
                <ul>
                  {ingredients.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              ) : (
                <p>No ingredients detected</p>
              )}
            </div>

            <div className="result-card">
              <h4>Matched Allergens</h4>
              {detectedAllergens.length ? (
                <ul>
                  {detectedAllergens.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>
              ) : (
                <p>No matched allergens</p>
              )}
            </div>

            <div className="result-card safety-card">
              <h4>Safety</h4>
              {safetyPercent !== null ? (
                <div
                  className={`safety-circle ${
                    safetyPercent > 90
                      ? "safe"
                      : safetyPercent > 70
                      ? "moderate"
                      : "unsafe"
                  }`}
                >
                  {safetyPercent}%
                </div>
              ) : (
                <p>Not available</p>
              )}
            </div>

            {Object.keys(alternatives).length > 0 && (
              <div className="result-card">
                <h4>Alternatives</h4>
                {Object.entries(alternatives).map(([alg, list]) => (
                  <div key={alg} className="alt-item">
                    <strong>{alg}</strong>
                    <ul>
                      {list.map((alt, i) => (
                        <li key={i}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="scan-again">
            <button onClick={handleReupload}>Scan another</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickScan;
