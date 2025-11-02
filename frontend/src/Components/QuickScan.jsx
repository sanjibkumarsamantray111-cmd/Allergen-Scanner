// import React, { useState } from "react";
// import { Upload, CheckCircle2, RefreshCw } from "lucide-react";
// import "./QuickScan.css";

// const QuickScan = () => {
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [loading, setLoading] = useState(false); // 🧩 Added
//   const [scanResult, setScanResult] = useState(""); // 🧩 Added

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadedImage(URL.createObjectURL(file));
//       setScanned(false);
//       setScanResult("");
//     }
//   };

//   const handleReupload = () => {
//     setUploadedImage(null);
//     setScanned(false);
//     setScanResult("");
//   };

//   // 🧩 Updated handleScan to call Gemini API
//   const handleScan = async () => {
//     if (!uploadedImage) return;
//     setLoading(true);
//     setScanResult("Analyzing image...");

//     try {
//       const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // Make sure it's in your .env file
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             contents: [
//               {
//                 parts: [
//                   {
//                     text:
//                       "You are an allergen detection AI. The user uploaded a food label image. Analyze it and respond briefly whether it may contain common allergens (gluten, dairy, nuts, soy, eggs, shellfish).",
//                   },
//                 ],
//               },
//             ],
//           }),
//         }
//       );

//       const data = await response.json();
//       console.log("Gemini API Response:", data);

//       const aiText =
//         data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "No clear analysis found.";

//       setScanResult(aiText);
//     } catch (err) {
//       console.error("Error scanning:", err);
//       setScanResult("Error analyzing image. Please try again.");
//     }

//     setLoading(false);
//     setScanned(true);
//   };

//   return (
//     <div className="quickscan-container">
//       <div className="quickscan-header">
//         <h1>Quick Scan</h1>
//         <p>Upload a food label or barcode image to detect allergens</p>
//       </div>

//       <div className="quickscan-card">
//         {/* Stage 1 - Upload */}
//         {!uploadedImage && (
//           <div className="upload-section">
//             <h2>Upload Image</h2>
//             <p>Upload an image of a food label or barcode</p>

//             <div className="upload-box">
//               <Upload className="upload-icon" />
//               <p>Drop your file here or click to browse</p>

//               <label htmlFor="file-upload" className="upload-btn">
//                 Upload Image
//               </label>
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="image/*"
//                 className="hidden-input"
//                 onChange={handleFileChange}
//               />
//             </div>

//             <p className="upload-info">
//               Supported formats: JPG, PNG • Max size: 10MB
//             </p>
//           </div>
//         )}

//         {/* Stage 2 - Ready to Scan */}
//         {uploadedImage && !scanned && (
//           <div className="ready-section">
//             <h2>Ready to Scan</h2>
//             <p>Click below to analyze the uploaded image</p>

//             <div className="image-preview">
//               <img src={uploadedImage} alt="Preview" />
//             </div>

//             <button
//               className="scan-btn"
//               onClick={handleScan}
//               disabled={loading}
//             >
//               {loading ? "Analyzing..." : "🔍 Scan Now"}
//             </button>

//             <button onClick={handleReupload} className="reupload-btn">
//               <RefreshCw className="reupload-icon" /> Re-upload
//             </button>
//           </div>
//         )}

//         {/* Stage 3 - Scan Results */}
//         {uploadedImage && scanned && (
//           <div className="result-section">
//             <div className="scan-left">
//               <CheckCircle2 className="check-icon" />
//               <h2>Scan Complete</h2>
//               <div className="image-preview small">
//                 <img src={uploadedImage} alt="Scanned" />
//               </div>

//               <button onClick={handleReupload} className="reupload-btn">
//                 <RefreshCw className="reupload-icon" /> Upload Another
//               </button>
//             </div>

//             <div className="scan-right">
//               <h3>AI Allergen Analysis</h3>
//               <p>{scanResult}</p>

//               <div className="score-bars">
//                 {[ // static example, can later replace with AI result mapping
//                   { label: "Gluten-Free", value: 99 },
//                   { label: "Dairy-Free", value: 85 },
//                   { label: "Nut-Free", value: 87 },
//                 ].map((item, i) => (
//                   <div key={i} className="score-row">
//                     <span>{item.label}</span>
//                     <div className="progress-bar">
//                       <div
//                         className="progress-fill"
//                         style={{ width: `${item.value}%` }}
//                       ></div>
//                     </div>
//                     <span className="percent">{item.value}%</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuickScan;


import React, { useState, useEffect } from "react";
import { Upload, CheckCircle2, RefreshCw } from "lucide-react";
import "./QuickScan.css";

const QuickScan = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [safetyScore, setSafetyScore] = useState(null);
  const [matchedAllergens, setMatchedAllergens] = useState([]);
   const [userAllergens, setUserAllergens] = useState([]);

  // Example allergens (you’ll replace this with user profile data later)
  // const userAllergens = ["gluten", "peanut", "milk", "soy", "egg", "fish", "shellfish"];

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setUploadedImage(file);
  //     setScanned(false);
  //     setScanResult("");
  //     setSafetyScore(null);
  //     setMatchedAllergens([]);
  //   }
  // };

   useEffect(() => {
    const fetchUserAllergens = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUserAllergens(data.allergens || []);
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
      setScanResult("");
      setSafetyScore(null);
      setMatchedAllergens([]);
    }
  };

  const handleReupload = () => {
    setUploadedImage(null);
    setScanned(false);
    setScanResult("");
    setSafetyScore(null);
    setMatchedAllergens([]);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });

  const handleScan = async () => {
  if (!uploadedImage) return;
  setLoading(true);
  setScanResult("Analyzing image...");

  try {
    const formData = new FormData();
    formData.append("image", uploadedImage);

    // 👇 Call your backend endpoint instead of Gemini directly
    const response = await fetch("http://localhost:5000/api/scan", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // if auth
      },
      body: formData,
    });

    const data = await response.json();
    console.log("✅ Backend scan result:", data);

    if (!response.ok) throw new Error(data.message || "Scan failed");

    // setSafetyScore(data.safetyPercent);
    // setScanResult(
    //   `🧠 ${data.foodItem || "Food item"} detected.\nStatus: ${data.safetyStatus}`
    // );
    setSafetyScore(data.safetyPercent || 0);
    setMatchedAllergens(data.detectedAllergens || []);
    // After setMatchedAllergens(data.detectedAllergens || []);
// Add this code 👇

// Save scan data locally for history
const newScan = {
  foodItem: data.foodItem || "Unknown Food",
  allergens: data.detectedAllergens || [],
  safetyStatus: data.safetyStatus || "Unknown",
  safetyPercent: data.safetyPercent || 0,
  dateTime: new Date().toISOString(),
};

const existingScans = JSON.parse(localStorage.getItem("scanHistory")) || [];
localStorage.setItem("scanHistory", JSON.stringify([newScan, ...existingScans]));

// Trigger update event for ScanHistory
window.dispatchEvent(new Event("scan-updated"));

  } catch (err) {
    console.error("❌ Error analyzing image:", err);
    setScanResult("❌ Error analyzing the food image. Try again.");
  }

  setLoading(false);
  setScanned(true);
};


  return (
    <div className="quickscan-container">
      <div className="quickscan-header">
        <h1>Quick Scan</h1>
        <p>Upload a food photo to check for possible allergens</p>
      </div>

      <div className="quickscan-card">
        {!uploadedImage && (
          <div className="upload-section">
            <h2>Upload Food Image</h2>
            <p>Take or upload a picture of your meal</p>
            <div className="upload-box">
              <Upload className="upload-icon" />
              <p>Drop your file here or click to browse</p>
              <label htmlFor="file-upload" className="upload-btn">
                Upload Image
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden-input"
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}

        {uploadedImage && !scanned && (
          <div className="ready-section">
            <h2>Ready to Analyze</h2>
            <div className="image-preview">
              <img src={URL.createObjectURL(uploadedImage)} alt="Preview" />
            </div>
            <button className="scan-btn" onClick={handleScan} disabled={loading}>
              {loading ? "Analyzing..." : "🔍 Analyze Food"}
            </button>
            <button onClick={handleReupload} className="reupload-btn">
              <RefreshCw className="reupload-icon" /> Re-upload
            </button>
          </div>
        )}

        {uploadedImage && scanned && (
          <div className="result-section">
            <div className="scan-left">
              <CheckCircle2 className="check-icon" />
              <h2>Scan Complete</h2>
              <div className="image-preview small">
                <img src={URL.createObjectURL(uploadedImage)} alt="Scanned" />
              </div>
              <button onClick={handleReupload} className="reupload-btn">
                <RefreshCw className="reupload-icon" /> Upload Another
              </button>
            </div>

            <div className="scan-right">
              <h3>AI Analysis Result</h3>
              <p>{scanResult}</p>

              {safetyScore !== null && (
                <>
                  <div className="score-circle">
                    <span>{safetyScore}%</span>
                  </div>
                  <p>
                    {safetyScore > 90
                      ? "🟢 Safe to eat"
                      : safetyScore > 70
                      ? "🟠 Might contain traces"
                      : "🔴 High allergen risk"}
                  </p>
                </>
              )}

              {matchedAllergens.length > 0 && (
                <div className="allergen-list">
                  <h4>Your Allergens Possibly Present:</h4>
                  <ul>
                    {matchedAllergens.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickScan;
