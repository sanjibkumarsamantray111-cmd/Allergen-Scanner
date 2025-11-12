import React, { useEffect, useState } from "react";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import "./MyProfile.css";
import API from "../api/api.js";
import toast from "react-hot-toast";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    phone: "",
    location: "",
  });

  const [showAllergenModal, setShowAllergenModal] = useState(false);
  const [newAllergen, setNewAllergen] = useState("");

  const existingAllergens = [
    "Peanuts",
    "Tree Nuts",
    "Dairy",
    "Eggs",
    "Gluten",
    "Soy",
    "Fish",
    "Shellfish",
    "Sesame",
  ];

  // 🔹 Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
      toast.error("Failed to load profile!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🔹 Edit form handlers
  const handleEditChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEditClick = () => {
    if (!profile) return;
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
      const res = await API.put("/profile/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.profile);
      setShowEditModal(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      toast.error("Failed to update profile!");
    }
  };

  // 🔹 Add allergen handler
  const handleAddAllergen = async () => {
    if (!newAllergen.trim()) {
      toast("Please enter or select an allergen.", { icon: "⚠️" });
      return;
    }

    if (profile.foods?.some((item) => item.allergen === newAllergen)) {
      toast("Allergen already added!", { icon: "⚠️" });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.put(
        "/profile/add-allergen",
        { allergen: newAllergen },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Allergen added successfully!");
      setNewAllergen("");
      setShowAllergenModal(false);
      fetchProfile(); // refresh profile data
    } catch (err) {
      console.error("❌ Error adding allergen:", err);
      toast.error("Failed to add allergen!");
    }
  };

  if (loading) return <div className="loading">Loading your profile...</div>;
  if (!profile) return <div className="no-profile">Profile not found.</div>;

  return (
    <div className="profile-page">
      {/* HEADER */}
      <div className="profile-header glass-card">
        <div className="profile-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="profile-img"
          />
          <div className="profile-info">
            <h2>{profile.fullName || "User"}</h2>
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

      {/* PERSONAL INFO */}
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
              <p>{profile.location || "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* ALLERGEN LIST */}
        <div className="info-card glass-card allergens-card">
          <h3>Allergens</h3>
          {profile.foods && profile.foods.length > 0 ? (
            <div className="allergen-container">
              {profile.foods.map((item, i) => (
                <span key={i} className="allergen-tag">
                  {item.allergen}
                </span>
              ))}
            </div>
          ) : (
            <p className="no-allergens">No allergens added yet.</p>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
  {/* EDIT MODAL */}
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

      {/* DOB input restricted to valid date */}
      <input
        type="date"
        name="dob"
        placeholder="Date of Birth"
        value={formData.dob}
        onChange={handleEditChange}
        max={new Date().toISOString().split("T")[0]} // DOB cannot be in the future
      />

      {/* Phone input restricted to digits only */}
      <input
        type="tel"
        name="phone"
        placeholder="Phone (10 digits)"
        value={formData.phone}
        onChange={handleEditChange}
        pattern="[0-9]{10}"
        maxLength={10}
        title="Enter a valid 10-digit phone number"
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

      {/* ADD ALLERGEN MODAL */}
      {showAllergenModal && (
        <div className="modal-overlay">
          <div className="modal glass-card">
            <h2>Add Allergen</h2>
            <label htmlFor="existing-allergen">
              Select from common allergens:
            </label>
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
