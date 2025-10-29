import React from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import HowItWorks from './HowItWork';

function Home() {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };



  return (
    <>
    <header>
    <div className='header-left'>
    <img className='logo'src="src\assets\WhatsApp Image 2025-10-21 at 21.37.10_d07fcf2f.jpg" />
    <p className='top'>AllergenScanner</p>
    </div>
    <div className='header-right'>
    <h1 className='left' onClick={handleGetStarted}>Login</h1>
    <h1 className='left'onClick={handleGetStarted}>Sign Up</h1>
    </div>
    </header>
    <div className='fullimage'>
    <main>
    <h1 className='main'>Scan. Detect. Stay Safe</h1>
    <p className='page'>Ingredient lists are long. Allergens are sneaky. Cross-contamination is a constant worry.<br></br> Standard allergy apps only check for the obvious, leaving you exposed to hidden derivatives and related compounds that can trigger a reaction</p>
    <h1 className='start' onClick={handleGetStarted}>Get Started</h1>
    </main>


    <section className="guardian-section">
      <h1 className="guardian-title">Your Guardian for Every Part of Life</h1>

      <div className="guardian-cards">
        <div className="guardian-card">
          <div className="emoji">🍎</div>
          <h2>For Food Allergies</h2>
          <p>
            Navigate grocery aisles with confidence. Instantly flag gluten,
            dairy, nuts, soy, and over 200+ other allergens in seconds.
          </p>
        </div>

        <div className="guardian-card">
          <div className="emoji">🧴</div>
          <h2>For Skin Sensitivities</h2>
          <p>
            Find the perfect cosmetic. Scan lotions and shampoos for common
            irritants like sulfates, parabens, and hidden fragrances before you
            buy.
          </p>
        </div>

        <div className="guardian-card">
          <div className="emoji">🥗</div>
          <h2>For Complex Diets & Lifestyles</h2>
          <p>
            Whether you're vegan, keto, or managing a complex condition like
            MCAS, AllergenScanner helps you stick to your plan by decoding every
            label.
          </p>
        </div>
      </div>
    </section>
 </div>
 <HowItWorks/>
    <footer className="footer">
  <div className="footer-container">

    {/* === Brand Section === */}
    <div className="footer-brand">
      <div className="footer-logo">
        <i className="fas fa-shield-alt"></i>
        <h2>AllergenScanner</h2>
      </div>
      <p>
        Your trusted companion for safe food choices.<br />
        Detect allergens instantly with AI-powered analysis.
      </p>
    </div>
     
    {/* === Quick Links === */}
    <div className="footer-column">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/">Scanner</a></li>
        <li><a href="/">Dashboard</a></li>
      </ul>
    </div>

    {/* === Resources === */}
    <div className="footer-column">
      <h3>Resources</h3>
      <ul>
        <li><a href="/">About Allergens</a></li>
        <li><a href="/">Food Safety</a></li>
        <li><a href="/">FAQ</a></li>
      </ul>
    </div>

    {/* === Connect Section === */}
    <div className="footer-column">
      <h3>Connect</h3>
      <div className="footer-icons">
        <a href="#"><i className="fab fa-github"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="mailto:support@allergenscanner.com"><i className="fas fa-envelope"></i></a>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; 2025 AllergenScanner. All rights reserved. Built with care for your safety.</p>
  </div>
</footer>


    </>
  )
}

export default Home
