import React from 'react';
import '../styles/Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <h1>Footstep Power</h1>
        <span className="tag">Sustainable lighting — Live</span>
      </div>

      <div className="header-actions">
        <div className="status-pill">Live</div>
      </div>
    </header>
  );
}
