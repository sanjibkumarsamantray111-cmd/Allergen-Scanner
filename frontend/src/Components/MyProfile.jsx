
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaCheckCircle, FaCrown, FaPlusCircle } from "react-icons/fa";
import "./MyProfile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    phone: "",
    location: "",
  });
  // const [foodData, setFoodData] = useState({
  //   name: "",
  //   calories: "",
  //   category: "",
  // });

    // Common allergens list
    // Allergen Modal State
const [showAllergenModal, setShowAllergenModal] = useState(false);
const [newAllergen, setNewAllergen] = useState("");
const [existingAllergens, setExistingAllergens] = useState([
  "Peanuts",
  "Tree Nuts",
  "Dairy",
  "Eggs",
  "Gluten",
  "Soy",
  "Fish",
  "Shellfish",
  "Sesame",
]);
  const commonAllergens = [
    "Gluten",
    "Milk",
    "Eggs",
    "Peanuts",
    "Tree Nuts",
    "Soy",
    "Fish",
    "Shellfish",
    "Sesame",
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFoodChange = (e) =>
    setFoodData({ ...foodData, [e.target.name]: e.target.value });

  const handleEditClick = () => {
    setFormData({
      fullName: profile.fullName || "",
      dob: profile.dob || "",
      phone: profile.phone || "",
      location: profile.location || "",
    });
    setShowEditModal(true);
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/profile/update",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data.profile);
      setShowEditModal(false);
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  // ✅ Add Allergen Handler
// ✅ Add Allergen Handler
const handleAddAllergen = async () => {
  if (!newAllergen.trim()) {
    alert("Please enter or select an allergen.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      "http://localhost:5000/api/profile/add-allergen",
      { allergen: newAllergen },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update profile with new allergen list
     const refreshed = await axios.get("http://localhost:5000/api/profile/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProfile(refreshed.data);

    setNewAllergen("");
    setShowAllergenModal(false);
    alert("✅ Allergen added successfully!");
  } catch (err) {
    console.error("❌ Error adding allergen:", err);
    alert("Failed to add allergen.");
  }
};


  const handleAddFood = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/profile/add-food",
        foodData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data.profile);
      setShowFoodModal(false);
      setFoodData({ name: "", calories: "", category: "" });
      alert("🍽 Food added successfully!");
    } catch (error) {
      console.error("❌ Error adding food:", error);
      alert("Failed to add food");
    }
  };

  if (loading) return <div className="loading">Loading your profile...</div>;
  if (!profile) return <div className="no-profile">Profile not found.</div>;

  return (
    <div className="profile-page">
      {/* HEADER SECTION */}
      <div className="profile-header glass-card">
        <div className="profile-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="profile-img"
          />
          <div className="profile-info">
            <h2>{profile.fullName || "User"}</h2>
            {/* <p className="email">{profile.email || "user@email.com"}</p> */}
            {/* <div className="badges">
              <span className="badge premium">
                <FaCrown /> Premium Member
              </span>
              <span className="badge verified">
                <FaCheckCircle /> Verified
              </span>
            </div> */}
          </div>
        </div>
        <div className="header-buttons">
          <button className="edit-btn" onClick={handleEditClick}>
            <FaEdit /> Edit
          </button>
          <button
            className="add-food-btn"
            onClick={() => setShowAllergenModal(true)}
          >
            <FaPlusCircle /> Add Allergen
          </button>
        </div>
      </div>

      {/* INFO SECTIONS */}
      <div className="profile-sections">
        <div className="info-card glass-card">
          <h3>Personal Info</h3>
          <div className="info-grid">
            <div>
              <p className="label">Full Name</p>
              <p>{profile.fullName || "Not set"}</p>
            </div>
            <div>
              <p className="label">Date of Birth</p>
              <p>{profile.dob || "Not provided"}</p>
            </div>
            <div>
              <p className="label">Phone</p>
              <p>{profile.phone || "Not provided"}</p>
            </div>
            <div>
              <p className="label">Location</p>
              <p>{profile.location || "Unknown"}</p>
            </div>
          </div>
        </div>

  <div className="info-card glass-card allergens-card">
  <h3>Allergens</h3>

  {profile.allergens && profile.allergens.length > 0 ? (
    <div className="allergen-container">
      {profile.allergens.map((allergen, i) => (
        <span key={i} className="allergen-tag">
          {allergen}
        </span>
      ))}
    </div>
  ) : (
    <p className="no-allergens">No allergens added yet.</p>
  )}
</div>

      </div>

{/* <div className="info-card glass-card">
  <h3>Allergens</h3>
  {profile.allergens && profile.allergens.length > 0 ? (
    <ul className="allergen-list">
      {profile.allergens.map((allergen, i) => (
        <li key={i} className="allergen-item">
          <strong>{allergen}</strong>
        </li>
      ))}
    </ul>
  ) : (
    <p className="no-allergens">No allergens added yet.</p>
  )}
</div> */}

      {/* MODALS */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal glass-card">
            <h2>Edit Profile</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleEditChange}
            />
            <div className="modal-buttons">
              <button onClick={handleSaveProfile} className="save-btn">
                Save
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

   {showAllergenModal && (
  <div className="modal-overlay">
    <div className="modal glass-card">
      <h2>Add Allergen</h2>

      <label htmlFor="existing-allergen">Select from common allergens:</label>
      <select
        id="existing-allergen"
        value={newAllergen}
        onChange={(e) => setNewAllergen(e.target.value)}
      >
        <option value="">-- Choose an allergen --</option>
        {existingAllergens.map((a, i) => (
          <option key={i} value={a}>
            {a}
          </option>
        ))}
      </select>

      <div className="or-divider">OR</div>

      <input
        type="text"
        placeholder="Enter custom allergen"
        value={newAllergen}
        onChange={(e) => setNewAllergen(e.target.value)}
      />

      <div className="modal-buttons">
        <button onClick={handleAddAllergen} className="save-btn">
          Add
        </button>
        <button
          onClick={() => setShowAllergenModal(false)}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Profile;
