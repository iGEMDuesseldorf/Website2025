import React, { useState, useEffect } from 'react';

export default function BioproductionProblems() {
  const [time, setTime] = useState(0);
  const [productHistory, setProductHistory] = useState([]);
  const [cellHappiness, setCellHappiness] = useState(100);
  const [hardwareCost, setHardwareCost] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Oscillating graph
    const baseOscillation = 60 + 20 * Math.sin(time * 0.1) + 15 * Math.sin(time * 0.28) + 10 * Math.cos(time * 0.45);
    const noise = (Math.random() - 0.5) * 25;
    const productLevel = Math.max(50, Math.min(90, baseOscillation + noise));
    setProductHistory((prev) => [...prev, productLevel].slice(-60));

    // Cell happiness decreases
    setCellHappiness((h) => Math.max(0, h - 0.3));

    // Hardware cost increases
    setHardwareCost((c) => Math.min(17000, c + 50));
  }, [time]);

  const cellEmoji = cellHappiness > 70 ? '😊' : cellHappiness > 40 ? '😐' : cellHappiness > 10 ? '😟' : '😵';

  return (
    <div className="w-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
        
        {/* Panel 1: Unstable Production */}
        <div className="bg-purple-950 bg-opacity-60 rounded-2xl border-3 border-purple-400 p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-white text-center mb-4">📉 Unstable Production</h2>
          <div className="flex-1 relative pl-8 pb-6">
            <svg className="w-full h-48">
              {/* Y-axis */}
              <line x1="0" x2="0" y1="0" y2="100%" stroke="#a78bfa" strokeWidth="2" />
              {/* X-axis */}
              <line x1="0" x2="100%" y1="100%" y2="100%" stroke="#a78bfa" strokeWidth="2" />
              
              {/* Target line */}
              <line x1="0" x2="100%" y1="30%" y2="30%" stroke="#4ade80" strokeWidth="2" strokeDasharray="5,5" />
              
              {/* Graph line */}
              {productHistory.length > 1 && (
                <polyline
                  points={productHistory
                    .map((val, i) => {
                      const x = (i / 59) * 100;
                      const y = 100 - val;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="3"
                />
              )}
            </svg>
            {/* Y-axis label */}
            <div className="absolute left-0 top-0 text-purple-300 text-xs">100%</div>
            <div className="absolute left-0 bottom-0 text-purple-300 text-xs">0%</div>
            {/* X-axis label */}
            <div className="absolute bottom-0 right-0 text-purple-300 text-xs">Time →</div>
          </div>
          <p className="text-purple-200 text-center text-sm mt-2">
            Product levels swing wildly - impossible to predict! 🎢
          </p>
        </div>

        {/* Panel 2: Metabolic Burden */}
        <div className="bg-purple-950 bg-opacity-60 rounded-2xl border-3 border-purple-400 p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-white text-center mb-4">😵 Metabolic Burden</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="relative inline-block">
                <div 
                  className="text-9xl mb-4 transition-all duration-300"
                  style={{
                    filter: cellHappiness < 50 ? 'hue-rotate(180deg) brightness(0.8)' : 'none'
                  }}
                >
                  🦠
                </div>
                <div className="absolute top-2 right-2 text-5xl">{cellEmoji}</div>
              </div>
              <div className="text-white text-xl font-bold">Cell Health: {Math.round(cellHappiness)}%</div>
            </div>
          </div>
          <p className="text-purple-200 text-center text-sm mt-4">
            Cells get exhausted from overproduction 😓
          </p>
        </div>

        {/* Panel 3: Expensive Hardware */}
        <div className="bg-purple-950 bg-opacity-60 rounded-2xl border-3 border-purple-400 p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-white text-center mb-4">💸 Expensive Hardware</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-300 mb-2">
                ${hardwareCost.toLocaleString()}
              </div>
              <div className="text-purple-200 text-base">and counting...</div>
            </div>
          </div>
          <p className="text-purple-200 text-center text-sm mt-4">
            Lab equipment costs keep climbing 📈
          </p>
        </div>

      </div>
    </div>
  );
}