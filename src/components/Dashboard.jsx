import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import ChartCard from './ChartCard';
import TotalsChart from './TotalsChart';
import '../styles/Dashboard.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
const MAX_POINTS = 500;

export default function Dashboard() {
  const [readings, setReadings] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/data`);
        const json = await res.json();
        if (json.success) {
          setReadings(json.data.slice(-MAX_POINTS));
        }
      } catch (err) {
        console.error('❌ Failed to fetch history:', err);
      }
    };
    fetchHistory();

    const socket = io(BACKEND_URL);
    socketRef.current = socket;

    socket.on('new-reading', (reading) => {
      setReadings(prev => [...prev, reading].slice(-MAX_POINTS));
    });

    return () => socket.disconnect();
  }, []);

  const latest = readings.length ? readings[readings.length - 1] : null;
  const formatNumber = (val, dec = 2) => (typeof val === 'number' ? val.toFixed(dec) : '—');

  return (
    <div className="dashboard">
      <div className="cards-grid">
        <div className="stat-card">
          <h3>Steps</h3>
          <div className="stat-large">{latest?.steps ?? '—'}</div>
          <div className="stat-sub">Total steps (latest)</div>
        </div>

        <div className="stat-card">
          <h3>Power (mW)</h3>
          <div className="stat-large">{formatNumber(latest?.power_mW)}</div>
          <div className="stat-sub">Instantaneous</div>
        </div>

        <div className="stat-card">
          <h3>Voltage (V)</h3>
          <div className="stat-large">{formatNumber(latest?.voltage_V)}</div>
          <div className="stat-sub">Instantaneous</div>
        </div>

        <div className="stat-card">
          <h3>Current (mA)</h3>
          <div className="stat-large">{formatNumber(latest?.current_mA, 3)}</div>
          <div className="stat-sub">Instantaneous</div>
        </div>
      </div>

      <div className="charts-grid">
        <ChartCard title="Steps (time series)" data={readings} dataKey="steps" />
        <ChartCard title="Power (mW)" data={readings} dataKey="power_mW" />
        <ChartCard
          title="Voltage (V) & Current (mA)"
          data={readings}
          dataKey="voltage_V"
          overlayKey="current_mA"
        />
      </div>

      <TotalsChart />
    </div>
  );
}
