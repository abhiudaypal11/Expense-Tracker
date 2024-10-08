import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // CSS for the page

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <div className="hero-section">
      <h1>
        Manage <span className="gradient-text">Your Expense</span>
        <br />
        Contol <span className="gradient-text">your Money</span>
      </h1>
      <p>Start monitoring your money and save ton of money</p>
      <button onClick={handleGetStarted} className="get-started-btn">
        Get Started
      </button>
    </div>
  );
}

export default HomePage;
