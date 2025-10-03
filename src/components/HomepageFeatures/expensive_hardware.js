import React, { useState, useEffect } from 'react';

export default function MetabolicBurden() {
  const [time, setTime] = useState(0);
  const [cellHealth, setCellHealth] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCellHealth((h) => Math.max(0, h - 0.3));
  }, [time]);

  const cellEmoji = cellHealth > 70 ? '😊' : cellHealth > 40 ? '😐' : cellHealth > 10 ? '😟' : '😵';

  return (
    <div className="bg-purple-950 bg-opacity-60 rounded-2xl border-3 border-purple-400 p-6 flex flex-col" style={{ minHeight: '400px' }}>
      <h2 className="text-xl font-bold text-white text-center mb-3">😵 Metabolic Burden</h2>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div 
              className="text-7xl mb-3 transition-all duration-300"
              style={{
                filter: cellHealth < 50 ? 'hue-rotate(180deg) brightness(0.8)' : 'none'
              }}
            >
              🦠
            </div>
            <div className="absolute top-0 right-0 text-4xl">{cellEmoji}</div>
          </div>
          <div className="text-white text-lg font-bold">Cell Health: {Math.round(cellHealth)}%</div>
        </div>
      </div>
      <p className="text-purple-200 text-center text-xs mt-2">
        Cells get exhausted from overproduction 😓
      </p>
    </div>
  );
}