import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "../styles/TotalsChart.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export default function TotalsChart() {
  const [totals, setTotals] = useState(null);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/totals`);
        const json = await res.json();
        if (json.success) setTotals(json.data);
      } catch (err) {
        console.error("❌ Failed to fetch totals:", err);
      }
    };
    fetchTotals();
  }, []);

  if (!totals) return null;

  const stepsPowerData = [
    { name: "Total Steps", value: totals.totalSteps },
    { name: "Total Power (mW)", value: totals.totalPower },
  ];

  const averagesData = [
    { name: "Avg Power (mW)", value: totals.avgPower },
    { name: "Avg Voltage (V)", value: totals.avgVoltage },
    { name: "Avg Current (mA)", value: totals.avgCurrent },
  ];

  const totalsVCData = [
    { name: "Total Voltage (V)", value: totals.totalVoltage },
    { name: "Total Current (mA)", value: totals.totalCurrent },
  ];

  const COLORS = ["#0088FE", "#FFBB28", "#00C49F"];

  return (
    <div className="totals-section">
      <h2>Overall Totals</h2>
      <div className="totals-chart-grid">
        <div className="totals-chart-item">
          <h3>Total Steps & Power</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={stepsPowerData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {stepsPowerData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="totals-chart-item">
          <h3>Average Values</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={averagesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="totals-chart-item">
          <h3>Total Voltage & Current</h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={totalsVCData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {totalsVCData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
