import React, { useState } from 'react';
import '../styles/Settings.css';

export default function Settings() {
  const [refreshInterval, setRefreshInterval] = useState(3);
  const [theme, setTheme] = useState('dark');

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Saved settings: refreshInterval=${refreshInterval}, theme=${theme}`);
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <form className="settings-form" onSubmit={handleSave}>
        <div className="form-group">
          <label>Refresh Interval (seconds)</label>
          <input
            type="number"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(e.target.value)}
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <button type="submit" className="save-btn">Save</button>
      </form>
    </div>
  );
}
