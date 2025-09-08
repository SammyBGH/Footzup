import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, AreaChart, Area } from 'recharts';
import '../styles/ChartCard.css';

function tidyData(data) {
  return data.map(d => ({
    ...d,
    xLabel: new Date(d.timestamp).toLocaleTimeString()
  }));
}

export default function ChartCard({ title, data = [], dataKey, overlayKey }) {
  const chartData = tidyData(data);

  // Compute min/max for dynamic Y-axis scaling
  const primaryValues = chartData.map(d => d[dataKey]).filter(v => typeof v === 'number');
  const overlayValues = overlayKey ? chartData.map(d => d[overlayKey]).filter(v => typeof v === 'number') : [];

  const primaryMin = Math.min(...primaryValues, 0);
  const primaryMax = Math.max(...primaryValues, 1);
  const overlayMin = overlayValues.length ? Math.min(...overlayValues, 0) : null;
  const overlayMax = overlayValues.length ? Math.max(...overlayValues, 1) : null;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h4>{title}</h4>
      </div>
      <div className="chart-body">
        <ResponsiveContainer width="100%" height={240}>
          {overlayKey ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="xLabel" minTickGap={20} />
              <YAxis yAxisId="left" domain={[primaryMin, primaryMax]} />
              <YAxis yAxisId="right" orientation="right" domain={[overlayMin, overlayMax]} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey={dataKey} stroke="#00e5ff" dot={false} />
              <Line yAxisId="right" type="monotone" dataKey={overlayKey} stroke="#7affc9" dot={false} />
            </LineChart>
          ) : (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="xLabel" />
              <YAxis domain={[primaryMin, primaryMax]} />
              <Tooltip />
              <Area type="monotone" dataKey={dataKey} fill="#003b6f" stroke="#00e5ff" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
