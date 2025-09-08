import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import { FaTachometerAlt, FaHistory, FaCog, FaInfoCircle } from "react-icons/fa";
import { BsBatteryCharging } from "react-icons/bs";

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <h1 className="logo-text">⚡ PowerGen</h1>
        ) : (
          <BsBatteryCharging className="logo-icon" />
        )}
      </div>
      <ul>
        <li>
          <Link to="/">
            <FaTachometerAlt className="icon" />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/history">
            <FaHistory className="icon" />
            {isOpen && <span>History</span>}
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog className="icon" />
            {isOpen && <span>Settings</span>}
          </Link>
        </li>
        <li>
          <Link to="/about">
            <FaInfoCircle className="icon" />
            {isOpen && <span>About</span>}
          </Link>
        </li>
      </ul>
    </aside>
  );
}
