import React, { useState, useEffect } from 'react';

export default function MetabolicBurden() {
  const [time, setTime] = useState(0);
  const [cells, setCells] = useState([]);

  useEffect(() => {
    const initialCells = Array.from({ length: 25 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 35;
      return {
        id: i,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
        health: 100,
        size: Math.random() * 8 + 5 // smaller radius for better fit
      };
    });
    setCells(initialCells);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCells(prevCells =>
      prevCells.map(cell => ({
        ...cell,
        health: Math.max(0, cell.health - 0.3)
      }))
    );
  }, [time]);

  const getColorFromHealth = health => {
    const red = Math.round(255 * (1 - health / 100));
    const green = Math.round(200 * (health / 100));
    const blue = Math.round(150 * (health / 100));
    return `rgb(${red},${green},${blue})`;
  };

  return (
    <div className="flex flex-col items-center p-6" style={{ minHeight: '400px', background: 'transparent' }}>
      <h2 className="text-xl font-bold text-white text-center mb-3">Metabolic Burden</h2>
      <svg viewBox="0 0 100 100" width="300" height="300">
        {/* Petri dish */}
        <circle cx="50" cy="50" r="48" fill="url(#agarGradient)" stroke="#999" strokeWidth="2" />

        <defs>
          <radialGradient id="agarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8dc" />
            <stop offset="100%" stopColor="#f0e68c" />
          </radialGradient>
        </defs>

        {/* Cells */}
        {cells.map(cell => (
          <circle
            key={cell.id}
            cx={cell.x}
            cy={cell.y}
            r={cell.size}
            fill={getColorFromHealth(cell.health)}
            opacity="0.9"
          />
        ))}
      </svg>
    </div>
  );
}
