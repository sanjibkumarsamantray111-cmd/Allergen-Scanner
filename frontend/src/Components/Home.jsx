import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, HeartHandshake, Settings } from "lucide-react";
import HowItWorks from "./HowItWork";
import AuthModal from "./AuthModal";
import ContactModal from "./ContactModal";
import "./Home.css";

// Assets
import logo from "../assets/Final Logo.png";
import heroBg from "../assets/Screenshot 2025-10-31 163529.png";
import scanImg from "../assets/Allergen_Scanner_App_Video_Mockup.mp4";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showContact, setShowContact] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // Open AuthModal if navigated to /auth directly
  useEffect(() => {
    if (location.pathname === "/auth") {
      setShowAuth(true);
    } else {
      setShowAuth(false);
    }
  }, [location.pathname]);

  const openAuthModal = () =>
    navigate("/auth", { state: { backgroundLocation: location } });

  const closeAuthModal = () => {
    setShowAuth(false);
    if (location.state?.backgroundLocation) {
      navigate(location.state.backgroundLocation.pathname, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  const openContactModal = () => setShowContact(true);
  const closeContactModal = () => setShowContact(false);

  return (
    <div className={`main-app-container ${showContact || showAuth ? "blurred" : ""}`}>
      {/* Header */}
      <header className="home-header">
        <div className="header-logo">
          <img src={logo} alt="AllergenScanner Logo" className="logo" />
          <span>AllergenScanner</span>
        </div>
        <nav className="header-nav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              openContactModal();
            }}
          >
            Contact Us
          </a>
        </nav>
        <div className="header-actions">
          <button className="btn-gradient" onClick={openAuthModal}>
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content-wrapper side-by-side">
          <div className="hero-content">
            <h1>Scan. Detect. Live Healthy.</h1>
            <p>
              AllergyScanner is a mobile app that uses AI to scan food items, menus, or labels,
              instantly identifying ingredients and checking them against your allergy profile.
            </p>
            <button className="btn-gradient" onClick={openAuthModal}>
              Start Scanning Today
            </button>
          </div>
          <div className="hero-app-preview-group">
            <div className="preview-layer video">
              <video src={scanImg} autoPlay muted loop playsInline />
            </div>
          </div>
        </div>
      </main>

      {/* Guardian Features */}
      <div className="pattern-background-section">
        <section className="guardian-features-section" id="features">
          <h2 className="section-title">Your Guardian for Every Part of Life</h2>
          <div className="guardian-cards-container">
            <div className="guardian-card shield-plate">
              <div className="guardian-icon-wrapper"><Shield /></div>
              <h3>Shield Your Plate</h3>
              <p>Navigate grocery aisles with confidence. Instantly flag allergens.</p>
              <button className="btn-gradient-blue" onClick={openAuthModal}>Start Smart Scan</button>
            </div>
            <div className="guardian-card personalized-mind">
              <div className="guardian-icon-wrapper"><HeartHandshake /></div>
              <h3>Personalized Peace of Mind</h3>
              <p>Create detailed profiles. Pinpoint trace amounts and alerts.</p>
              <button className="btn-gradient-blue" onClick={openAuthModal}>Create Smart Profile</button>
            </div>
            <div className="guardian-card secure-hub">
              <div className="guardian-icon-wrapper"><Settings /></div>
              <h3>Smart, Secure Health Hub</h3>
              <p>Manage complex diets, track ingredients, and gain insights.</p>
              <button className="btn-gradient-blue" onClick={openAuthModal}>Track Allergens</button>
            </div>
          </div>
        </section>

        <div id="how-it-works">
          <HowItWorks openAuthModal={openAuthModal} />
        </div>
      </div>

      {/* Footer */}
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
              <li><Link to="/terms-of-use">Terms Of Use</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/about-allergens">About Allergens</Link></li>
<li><Link to="/food-safety">Food Safety</Link></li>
<li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Connect</h3>
            <div className="footer-icons">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  openContactModal();
                }}
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 AllergenScanner. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      {showAuth && (
        <div className="auth-overlay active" onClick={closeAuthModal}>
          <AuthModal closeModal={closeAuthModal} />
        </div>
      )}

      {showContact && (
        <div className="auth-overlay active" onClick={closeContactModal}>
          <ContactModal closeModal={closeContactModal} />
        </div>
      )}
    </div>
  );
}

export default Home;
