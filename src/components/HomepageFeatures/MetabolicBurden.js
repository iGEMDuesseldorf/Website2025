import React, { useState, useEffect } from 'react';

export default function MetabolicBurden() {
  const [time, setTime] = useState(0);
  const [cells, setCells] = useState([]);

  useEffect(() => {
    // Initialize cells with random positions in a circular pattern
    const initialCells = Array.from({ length: 25 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 35;
      return {
        id: i,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
        health: 100,
        size: Math.random() * 15 + 25
      };
    });
    setCells(initialCells);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Degrade cell health over time more slowly
    setCells(prevCells => 
      prevCells.map(cell => ({
        ...cell,
        health: Math.max(0, cell.health - 0.15)
      }))
    );
  }, [time]);

  const getColorFromHealth = (health) => {
    // Smooth gradient from green to red
    const red = Math.round(255 * (1 - health / 100) + 16 * (health / 100));
    const green = Math.round(185 * (health / 100) + 68 * (1 - health / 100));
    const blue = Math.round(129 * (health / 100) + 68 * (1 - health / 100));
    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <div className="bg-purple-950 bg-opacity-60 rounded-2xl border-3 border-purple-400 p-6 flex flex-col" style={{ minHeight: '400px' }}>
      <h2 className="text-xl font-bold text-white text-center mb-3">Metabolic Burden</h2>
      <div className="flex-1 flex items-center justify-center relative" style={{ minHeight: '250px' }}>
        <div className="relative w-full max-w-xs aspect-square">
          {/* Petri dish */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-400 bg-gradient-to-br from-gray-400 to-gray-300 shadow-2xl overflow-hidden">
            {/* Agar medium */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 opacity-60"></div>
            
            {/* Cells */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {cells.map(cell => (
                <g key={cell.id}>
                  {/* Cell glow/shadow */}
                  <circle
                    cx={cell.x}
                    cy={cell.y}
                    r={cell.size / 8}
                    fill={getColorFromHealth(cell.health)}
                    opacity="0.3"
                    filter="blur(2px)"
                  />
                  {/* Main cell */}
                  <circle
                    cx={cell.x}
                    cy={cell.y}
                    r={cell.size / 10}
                    fill={getColorFromHealth(cell.health)}
                    opacity="0.9"
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth="0.3"
                    className="transition-all duration-1000"
                  >
                    <animate
                      attributeName="r"
                      values={`${cell.size / 10};${cell.size / 10 + 0.3};${cell.size / 10}`}
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
            </svg>

            {/* Petri dish shine effect */}
            <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-white opacity-20 blur-xl"></div>
          </div>
          
          {/* Petri dish lid rim */}
          <div className="absolute inset-0 rounded-full border-2 border-gray-300 pointer-events-none" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}></div>
        </div>
      </div>
    </div>
  );
}