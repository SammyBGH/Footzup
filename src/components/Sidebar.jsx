import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import { FaTachometerAlt, FaHistory, FaCog, FaInfoCircle } from "react-icons/fa";
import { BsBatteryCharging } from "react-icons/bs";

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="top-left-menu" ref={menuRef}>
      <BsBatteryCharging
        className="menu-icon"
        onClick={() => setMenuOpen((prev) => !prev)}
      />
      {menuOpen && (
        <ul className="dropdown-menu">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <FaTachometerAlt className="icon" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/history" onClick={() => setMenuOpen(false)}>
              <FaHistory className="icon" /> History
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={() => setMenuOpen(false)}>
              <FaCog className="icon" /> Settings
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              <FaInfoCircle className="icon" /> About
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
