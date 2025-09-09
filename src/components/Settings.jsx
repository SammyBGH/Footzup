import React from 'react';
import '../styles/Settings.css';

export default function Settings() {
  return (
    <div className="settings-page">
      <h2>Settings & Showcase</h2>

      {/* Static info cards */}
      <div className="static-card">
        <h3>Welcome to the Dashboard</h3>
        <p>
          This page is purely visual. Here you can see the theme colors, gradient accents, 
          and static information cards without affecting other parts of the app.
        </p>
      </div>

      <div className="static-card">
        <h3>About This Project</h3>
        <p>
          Footstep-powered energy harvesting system for sustainable lighting.
          This page showcases colors and UI elements only.
        </p>
      </div>

      {/* Color swatches */}
      <div className="static-card">
        <h3>Theme Colors</h3>
        <div className="color-swatches">
          <div className="color-swatch" style={{ background: '#071027' }}></div>
          <div className="color-swatch" style={{ background: '#003b6f' }}></div>
          <div className="color-swatch" style={{ background: '#00e5ff' }}></div>
          <div className="color-swatch" style={{ background: '#005f7a' }}></div>
        </div>
      </div>

      {/* Gradient showcase */}
      <div className="static-card">
        <h3>Gradient Accents</h3>
        <div className="gradient-showcase">
          <div className="gradient-bar"></div>
          <div className="gradient-bar" style={{ background: 'linear-gradient(135deg, #1b84c5, #003b6f)' }}></div>
          <div className="gradient-bar" style={{ background: 'linear-gradient(135deg, #00e5ff, #007a99)' }}></div>
        </div>
      </div>
      
      <div className="static-card app-info">
        <h3>App Info</h3>
        <p>Version: 1.0.0</p>
        <p>Authors: Group 2</p>
        <p>Project: Footstep-Powered Energy Harvesting System</p>
      </div>
    </div>
  );
}
