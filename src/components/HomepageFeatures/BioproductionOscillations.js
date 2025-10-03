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
    <div className="w-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-6" style={{ minHeight: '500px' }}>
      <div className="max-w-7xl mx-auto flex gap-6">
        
        {/* Panel 1: Unstable Production */}
        <div className="flex-1 bg-purple-950 bg-opacity-60 rounded-2xl border-3 border-purple-400 p-6 flex flex-col" style={{ minWidth: '300px' }}>
          <h2 className="text-xl font-bold text-white text-center mb-3">📉 Unstable Production</h2>
          <div className="flex-1 relative pl-6 pb-4" style={{ minHeight: '200px' }}>
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Y-axis */}
              <line x1="0" x2="0" y1="0" y2="100" stroke="#a78bfa" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              {/* X-axis */}
              <line x1="0" x2="100" y1="100" y2="100" stroke="#a78bfa" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              
              {/* Target line */}
              <line x1="0" x2="100" y1="30" y2="30" stroke="#4ade80" strokeWidth="0.5" strokeDasharray="2,2" vectorEffect="non-scaling-stroke" />
              
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
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              )}
            </svg>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 text-purple-300 text-xs">100%</div>
            <div className="absolute left-0 bottom-0 text-purple-300 text-xs">0%</div>
            {/* X-axis label */}
            <div className="absolute bottom-0 right-0 text-purple-300 text-xs">Time →</div>
          </div>
          <p className="text-purple-200 text-center text-xs mt-2">
            Product levels swing wildly - impossible to predict! 🎢
          </p>
        </div>

        {/* Panel 2: Metabolic Burden */}
        <div className="flex-1 bg-purple-950 bg-opacity-60 rounded-2xl border-3 border-purple-400 p-6 flex flex-col" style={{ minWidth: '300px' }}>
          <h2 className="text-xl font-bold text-white text-center mb-3">😵 Metabolic Burden</h2>
          <div className="flex-1 flex items-center justify-center" style={{ minHeight: '200px' }}>
            <div className="text-center">
              <div className="relative inline-block">
                <div 
                  className="text-7xl mb-3 transition-all duration-300"
                  style={{
                    filter: cellHappiness < 50 ? 'hue-rotate(180deg) brightness(0.8)' : 'none'
                  }}
                >
                  🦠
                </div>
                <div className="absolute top-0 right-0 text-4xl">{cellEmoji}</div>
              </div>
              <div className="text-white text-lg font-bold">Cell Health: {Math.round(cellHappiness)}%</div>
            </div>
          </div>
          <p className="text-purple-200 text-center text-xs mt-2">
            Cells get exhausted from overproduction 😓
          </p>
        </div>

        {/* Panel 3: Expensive Hardware */}
        <div className="flex-1 bg-purple-950 bg-opacity-60 rounded-2xl border-3 border-purple-400 p-6 flex flex-col" style={{ minWidth: '300px' }}>
          <h2 className="text-xl font-bold text-white text-center mb-3">💸 Expensive Hardware</h2>
          <div className="flex-1 flex items-center justify-center" style={{ minHeight: '200px' }}>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">
                ${hardwareCost.toLocaleString()}
              </div>
              <div className="text-purple-200 text-sm">and counting...</div>
            </div>
          </div>
          <p className="text-purple-200 text-center text-xs mt-2">
            Lab equipment costs keep climbing 📈
          </p>
        </div>

      </div>
    </div>
  );
}