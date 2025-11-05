import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HowItWorks from "./HowItWork";
import AuthModal from "./AuthModal";
import "./Home.css";
// import "./AllergyPreview.css";

// Assets
import logo from "../assets/Final Logo.png";
import heroBg from "../assets/Screenshot 2025-10-31 163529.png";
import dietaryImg from "../assets/Gemini_Generated_Image_87amg087amg087am.png";
import scanImg from "../assets/Gemini_Generated_Image_qtoaroqtoaroqtoa (1).png";
import resultImg from "../assets/Gemini_Generated_Image_p29w0qp29w0qp29w (1).png";

// Icons
const ShieldPlateIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4.5 18 4.5 10.5V4.5L12 1.5L19.5 4.5V10.5C19.5 18 12 21 12 21Z" />
  </svg>
);

const PersonHeartIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z" />
  </svg>
);

const GearsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" />
  </svg>
);

function Home() {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  const openAuthModal = () => setShowAuth(true);
  const closeAuthModal = () => setShowAuth(false);

  return (
    <div className={`main-app-container ${showAuth ? "blurred" : ""}`}>
      {/* === Header === */}
      <header className="home-header">
        <div className="header-logo">
          <img src={logo} alt="AllergenScanner Logo" className="logo" />
          <span>AllergenScanner</span>
        </div>
        <nav className="header-nav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#contact">Contact Us</a>
        </nav>
        <div className="header-actions">
          <button className="btn-gradient" onClick={openAuthModal}>
            Sign Up
          </button>
        </div>
      </header>

      {/* === Hero Section === */}
      <main className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
  <div className="hero-overlay"></div>
  <div className="hero-content-wrapper side-by-side">
    <div className="hero-content">
      <h1>Scan. Detect. Live Healthy.</h1>
      <p>
      AllergyScanner is a mobile app that uses Al to scan food items, menus, or labels, instantly identifying ingredients and checking them against a user's allergy profile to determine if they're safe to eat.
      </p>
      <button className="btn-gradient" onClick={openAuthModal}>
        Start Scanning Today
      </button>
    </div>

    {/* --- App Preview (3 Screens Side-by-Side) --- */}
    <div className="hero-app-preview-group">
      <img src={dietaryImg} alt="Dietary Restrictions" className="app-preview-img" />
      <img src={scanImg} alt="Food Scanning Demo" className="app-preview-img middle" />
      <img src={resultImg} alt="Safe Result" className="app-preview-img" />
    </div>
  </div>
</main>



      {/* === Guardian Features === */}
      <div className="pattern-background-section">
        <section className="guardian-features-section" id="features">
          <h2 className="section-title">Your Guardian for Every Part of Life</h2>
          <div className="guardian-cards-container">
            <div className="guardian-card shield-plate" onClick={openAuthModal}>
              <div className="guardian-icon-wrapper"><ShieldPlateIcon /></div>
              <h3>Shield Your Plate</h3>
              <p>Navigate grocery aisles with confidence. Instantly flag allergens.</p>
              <button className="btn-gradient-blue">Start Smart Scan</button>
            </div>
            <div className="guardian-card personalized-mind" onClick={openAuthModal}>
              <div className="guardian-icon-wrapper"><PersonHeartIcon /></div>
              <h3>Personalized Peace of Mind</h3>
              <p>Create detailed profiles. Pinpoint trace amounts and alerts.</p>
              <button className="btn-gradient-blue">Create Smart Profile</button>
            </div>
            <div className="guardian-card secure-hub" onClick={openAuthModal}>
              <div className="guardian-icon-wrapper"><GearsIcon /></div>
              <h3>Smart, Secure Health Hub</h3>
              <p>Manage complex diets, track ingredients, and gain insights.</p>
              <button className="btn-gradient-blue">Track Allergens</button>
            </div>
          </div>
        </section>

        {/* === How It Works === */}
        <div id="how-it-works">
          <HowItWorks />
        </div>
      </div>

      {/* === Footer === */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logo} alt="AllergenScanner Logo" className="footer-brand-logo" />
              <h2>AllergenScanner</h2>
            </div>
            <p>Your trusted companion for safe food choices.</p>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">Scanner</a></li>
              <li><a href="/">Dashboard</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><a href="/">About Allergens</a></li>
              <li><a href="/">Food Safety</a></li>
              <li><a href="/">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Connect</h3>
            <div className="footer-icons">
  <a href="tel:+911234567890"><i className="fas fa-phone"></i></a>
  <a href="https://www.google.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-google"></i></a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
</div>

          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AllergenScanner. All rights reserved.</p>
        </div>
      </footer>

      {/* === Auth Modal === */}
      {showAuth && (
        <div className="auth-overlay active" onClick={closeAuthModal}>
          <AuthModal closeModal={closeAuthModal} />
        </div>
      )}
    </div>
  );
}

export default Home;