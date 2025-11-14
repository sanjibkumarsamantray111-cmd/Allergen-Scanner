import React from 'react';
import { BrainCircuit } from "lucide-react";
import './HowItWork.css'; 
import { useNavigate } from 'react-router-dom';

// --- NEW ICONS to match "How It Works" image ---

// 1. Scan Product (Blue Smartphone with White Lines)
const ScanIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#3B82F6" xmlns="http://www.w3.org/2000/svg"> {/* Blue Fill */}
    <path fillRule="evenodd" clipRule="evenodd" d="M7 2C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2H7ZM7 18V7H17V18H7Z" />
    <path d="M9 10H15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> {/* White Stroke */}
    <path d="M9 13H15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> {/* White Stroke */}
  </svg>
);

// 2. AI Analysis (Purple Brain)
const BrainIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#8B5CF6" xmlns="http://www.w3.org/2000/svg"> {/* Purple Fill */}
    <path fillRule="evenodd" clipRule="evenodd" d="M12 3C9.79086 3 7.9 3.84198 6.44975 5.29289C5 6.74264 4 8.79086 4 11C4 13.5523 5.538 15.714 7.68 16.6311C7.30113 17.5 7 18.4513 7 19.4444C7 20.8528 7.61158 22.146 8.58579 23.0355C9.55999 23.9251 10.7441 24.5 12 24.5C13.2559 24.5 14.4401 23.9251 15.4142 23.0355C16.3884 22.146 17 20.8528 17 19.4444C17 18.4513 16.6989 17.5 16.32 16.6311C18.462 15.714 20 13.5523 20 11C20 8.79086 19 6.74264 17.5502 5.29289C16.1 3.84198 14.2091 3 12 3ZM12 5C13.8056 5 15.421 5.87758 16.4882 7.23467C16.1423 7.73319 15.8643 8.28015 15.6667 8.85714C15.0667 8.6 14.4 8.42857 13.7143 8.42857C12.4411 8.42857 11.2729 8.87784 10.3454 9.6644C9.41793 10.451 8.80219 11.5121 8.6041 12.6865C8.08375 12.5511 7.5815 12.4286 7.14286 12.4286C6.79157 12.4286 6.45862 12.4639 6.14286 12.5306C6.04834 12.0358 6 11.5238 6 11C6 8.9818 7.0253 7.20882 8.34863 6.09633C9.53037 5.09955 10.774 5 12 5ZM12 22.4545C11.1636 22.4545 10.5 22.1515 10.0545 21.6667C9.60909 21.1818 9.36364 20.5758 9.27273 19.8485C9.52727 19.1212 10.0545 18.5152 10.8 18C10.9818 17.8485 11.1818 17.697 11.4 17.5152C11.7636 17.2727 12 16.8788 12 16.4242C12 15.9394 11.7 15.4848 11.2091 15.1212C10.7182 14.7576 10.0364 14.3333 9.41818 13.8182C8.8 13.303 8.32727 12.697 8 12C8 11.8788 8 11.697 8 11.5152C8 11.3939 8 11.1818 8 11C8 10.9394 8 10.8485 8 10.7576C8.83636 10.3333 9.76364 10.0909 10.7273 10.0909C11.5091 10.0909 12.2364 10.2727 12.9091 10.6364C13.5818 11 14.1091 11.5152 14.4364 12.1212C14.8 12.7879 15 13.6061 15 14.5C15 15.3939 14.8 16.2121 14.4364 16.8788C14.1091 17.5152 13.5818 18 12.9091 18.3636C12.2364 18.7273 11.5091 18.9091 10.7273 18.9091C10.7273 19.6364 10.8182 20.303 11.1273 20.8788C11.4364 21.4545 11.7818 21.8182 12 22C12.0909 22.0909 12.1818 22.1818 12.2182 22.2727C12.2182 22.303 12.1818 22.3636 12.1455 22.3939C12.1091 22.4242 12.0909 22.4545 12 22.4545ZM16.9091 12.4286C16.5909 12.4639 16.258 12.5 15.9286 12.5C15.8202 11.751 15.5259 11.0537 15.0689 10.5303C14.5091 9.87879 13.6909 9.54545 12.8364 9.54545C12.4 9.54545 11.9818 9.63636 11.5818 9.81818C11.6182 9.27273 11.7818 8.78788 12.0909 8.36364C12.5455 7.78788 13.1636 7.39394 13.9636 7.21212C14.5818 7.06061 15.2182 6.9697 15.8182 6.9697C16.6182 6.9697 17.3636 7.21212 18 7.78788C18.6364 8.36364 19 9.18182 19 10.1515C19 10.7576 18.8727 11.3333 18.6182 11.8788C18.3636 12.4242 18.0182 12.8788 17.6364 13.1515C17.4545 13.2727 17.3273 13.3636 17.1818 13.4242C17.1818 13.4545 17.1455 13.5152 17.1091 13.5455C16.5455 13.8485 16 14.2424 15.5455 14.6364C15.0909 15.0303 14.7455 15.5455 14.5455 16.1515C14.3818 16.6667 14.3273 17.2121 14.3273 17.7576C14.3273 18.1818 14.3636 18.6364 14.4727 19.0909C14.0545 19.8788 13.4545 20.5455 12.7273 20.9394C12.7636 20.303 12.7273 19.697 12.6182 19.1212C13.2182 19.0303 13.7818 18.6667 14.2182 18.1212C14.6545 17.5758 14.9455 16.9394 15.0545 16.2727C15.1636 15.6061 15.1636 14.9697 15 14.3636C15.3636 14.1212 15.6545 13.8182 15.8545 13.4242C16.0545 13.0303 16.1455 12.6364 16.1455 12.2121C16.1455 12.0303 16.1455 11.8788 16.1091 11.7273C16.1091 11.6061 16.1091 11.5152 16.1091 11.4242C16.5091 11.303 16.8364 11.0909 17.0545 10.8182C17.2727 10.5455 17.4182 10.1818 17.4182 9.81818C17.4182 9.45455 17.3273 9.12121 17.0545 8.87879C16.7818 8.63636 16.4545 8.45455 16.0909 8.45455C15.7273 8.45455 15.4 8.57576 15.1818 8.81818C14.9636 9.06061 14.8182 9.39394 14.8182 9.75758C14.8182 10.1212 14.9273 10.4545 15.1818 10.697C15.4364 10.9394 15.7636 11.1212 16.1273 11.1212C16.1273 11.1515 16.1273 11.1818 16.1273 11.2424C16.1273 11.2727 16.1273 11.3333 16.1091 11.3636C16.1091 11.3939 16.1091 11.4242 16.1091 11.4242C16.0909 11.7273 16.0545 12 16.2364 12.2727C16.3455 12.5455 16.5455 12.8485 16.9091 13.1515C16.9091 12.9394 16.9091 12.697 16.9091 12.4286Z"/>
  </svg>
);

// 3. Get Results (Pink Shield with White Check)
const ShieldCheckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#EC4899" xmlns="http://www.w3.org/2000/svg"> {/* Pink Fill */}
    <path fillRule="evenodd" clipRule="evenodd" d="M12 21C12 21 4.5 18 4.5 10.5V4.5L12 1.5L19.5 4.5V10.5C19.5 18 12 21 12 21ZM11.25 14.25L9.75 12.75L8.55 13.95L11.25 16.65L16.65 11.25L15.45 10.05L11.25 14.25Z" fill="#FFFFFF"/> {/* White checkmark path */}
    {/* Optional: Add the shield outline back if needed, but the image only shows fill */}
    {/* <path d="M12 21C12 21 4.5 18 4.5 10.5V4.5L12 1.5L19.5 4.5V10.5C19.5 18 12 21 12 21Z" stroke="#EC4899" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> */}
  </svg>
);


const HowItWorks = ({ openAuthModal }) => {
  const navigate = useNavigate();

  return (
    <section className="howitworks-section">
      <div className="howitworks-container">
        <h2 className="howitworks-title">How It Works</h2>
        <p className="howitworks-subtitle">Simple steps to food safety</p>

        <div className="steps-container">
          
          <div className="step-box">
            {/* 1. Scan Product */}
            <div className="step-icon-wrapper" style={{ 
                background: '#DBEAFE', // Light Blue
                color: '#3B82F6'       // Dark Blue
            }}>
              <ScanIcon />
            </div>
            <h3 className="step-title">1. Scan Product</h3>
            <p className="step-description">
              Take a photo or scan barcode of any food product
            </p>
          </div>

          <div className="step-box">
            {/* 2. AI Analysis */}
            <div className="step-icon-wrapper" style={{ 
                background: '#F3E8FF', 
                color: '#5f3ab6ff'     
            }}>
              <BrainCircuit />
            </div>
            <h3 className="step-title">2. AI Analysis</h3>
            <p className="step-description">
              Our AI analyzes ingredients for allergens and sensitivities
            </p>
          </div>

          <div className="step-box">
            {/* 3. Get Results */}
            <div className="step-icon-wrapper" style={{ 
                background: '#dd3193ff', // Light Pink
                color: '#ca0f6cff'       // Dark Pink
            }}>
              <ShieldCheckIcon />
            </div>
            <h3 className="step-title">3. Get Results</h3>
            <p className="step-description">
              Receive instant safety report based on your profile
            </p>
          </div>

        </div>

        <div className="cta-section">
          <h3 className="cta-title">Ready to Stay Safe?</h3>
          <p className="cta-subtitle">
            Join thousands of users who trust AllerScan to keep them safe from food allergens
          </p>
          <button className="btn-gradient-blue" onClick={openAuthModal}>
            Start Your Free Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;