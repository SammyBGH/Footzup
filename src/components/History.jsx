import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import '../styles/History.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export default function History() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/data`);
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error('❌ Failed to fetch history:', err);
      }
    };
    fetchHistory();

    const socket = io(BACKEND_URL);
    socketRef.current = socket;
    socket.on('new-reading', (reading) => setData(prev => [...prev, reading]));
    return () => socket.disconnect();
  }, []);

  const handleDownloadCSV = () => {
    if (!data.length) return;
    const header = ["Timestamp", "Steps", "Power (mW)", "Voltage (V)", "Current (mA)"];
    const rows = data.map(d => [
      new Date(d.timestamp).toLocaleString(),
      d.steps ?? "—",
      d.power_mW ?? "—",
      d.voltage_V ?? "—",
      d.current_mA ?? "—"
    ]);
    const csvContent = [header, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `footstep-history-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatValue = (val, decimals = 2) =>
    typeof val === "number" && !isNaN(val) ? val.toFixed(decimals) : "—";

  const filteredData = data.filter(d => {
    const query = search.toLowerCase();
    const matchesSearch =
      d.steps?.toString().includes(query) ||
      d.power_mW?.toString().includes(query) ||
      d.voltage_V?.toString().includes(query) ||
      d.current_mA?.toString().includes(query) ||
      new Date(d.timestamp).toLocaleString().toLowerCase().includes(query);

    if (filter === 'all') return matchesSearch;
    if (filter === 'high-voltage') return matchesSearch && d.voltage_V > 2.5;
    if (filter === 'low-voltage') return matchesSearch && d.voltage_V <= 2.5;
    if (filter === 'high-steps') return matchesSearch && d.steps > 20;
    if (filter === 'low-steps') return matchesSearch && d.steps <= 20;
    return matchesSearch;
  });

  return (
    <div className="history-page">
      <div className="history-header">
        <h2>History</h2>
        <button className="download-btn" onClick={handleDownloadCSV}>⬇ Download CSV</button>
      </div>

      <div className="history-controls">
        <input
          type="text"
          placeholder="Search by value or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="high-voltage">High Voltage (&gt; 2.5V)</option>
          <option value="low-voltage">Low Voltage (≤ 2.5V)</option>
          <option value="high-steps">High Steps (&gt; 20)</option>
          <option value="low-steps">Low Steps (≤ 20)</option>
        </select>
      </div>

      <p>All recorded readings are listed below (live updating):</p>
      <div className="history-table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Steps</th>
              <th>Power (mW)</th>
              <th>Voltage (V)</th>
              <th>Current (mA)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d, i) => (
              <tr key={i}>
                <td>{new Date(d.timestamp).toLocaleString()}</td>
                <td>{d.steps ?? "—"}</td>
                <td>{formatValue(d.power_mW)}</td>
                <td>{formatValue(d.voltage_V)}</td>
                <td>{formatValue(d.current_mA, 3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && <p className="no-results">No matching results found.</p>}
      </div>
    </div>
  );
}
