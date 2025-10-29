import React from "react";
import "./HowItWork.css";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Scan Product",
      description: "Take a photo or scan barcode of any food product",
      color: "blue",
    },
    {
      id: 2,
      title: "AI Analysis",
      description: "Our AI analyzes ingredients for allergens and sensitivities",
      color: "purple",
    },
    {
      id: 3,
      title: "Get Results",
      description: "Receive instant safety report based on your profile",
      color: "pink",
    },
  ];

  return (
    <section className="howitworks-section">
      <div className="howitworks-container">
        <h2 className="howitworks-title">How It Works</h2>
        <p className="howitworks-subtitle">Simple steps to food safety</p>

        <div className="steps-container">
          {steps.map((step) => (
            <div className="step-box" key={step.id}>
              <div className={`step-number ${step.color}`}>{step.id}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <h3 className="cta-title">Ready to Stay Safe?</h3>
          <p className="cta-subtitle">
            Join thousands of users who trust AllerScan to keep them safe from food allergens
          </p>
          <button className="cta-button">Start Your Free Account</button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
