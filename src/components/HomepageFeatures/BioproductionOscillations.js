import React, { useState, useEffect } from 'react';

export default function UnstableProduction() {
  const [time, setTime] = useState(0);
  const [productHistory, setProductHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const baseOscillation = 60 + 20 * Math.sin(time * 0.1) + 15 * Math.sin(time * 0.28) + 10 * Math.cos(time * 0.45);
    const noise = (Math.random() - 0.5) * 25;
    const productLevel = Math.max(50, Math.min(90, baseOscillation + noise));

    setProductHistory((prev) => [...prev, productLevel].slice(-60));
  }, [time]);

  return (
    <div className="rounded-2xl border-3 border-purple-400 p-6 flex flex-col" style={{ minHeight: '400px' }}>
      <h2 className="text-xl font-bold text-white text-center mb-3">📉 Unstable Production</h2>
      <div className="flex-1 relative pl-12 pb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ minHeight: '200px' }}>
          {/* Vertical axis */}
          <line x1="10" x2="10" y1="0" y2="100" stroke="#a78bfa" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          {/* Horizontal axis */}
          <line x1="10" x2="100" y1="90" y2="90" stroke="#a78bfa" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />

          {/* Threshold line */}
          <line x1="10" x2="100" y1={100 - 70} y2={100 - 70} stroke="#4ade80" strokeWidth="0.5" strokeDasharray="2,2" vectorEffect="non-scaling-stroke" />

          {/* Product line */}
          {productHistory.length > 1 && (
            <polyline
              points={productHistory
                .map((val, i) => {
                  const x = 10 + (i / 59) * 90; // leave margin for y-axis
                  const y = 100 - val;
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#c084fc"
              strokeWidth="2" // thicker line
              vectorEffect="non-scaling-stroke"
            />
          )}

          {/* Y-axis labels */}
          <text x="0" y="10" fontSize="4" fill="#a78bfa">100%</text>
          <text x="0" y="90" fontSize="4" fill="#a78bfa">0%</text>

          {/* Y-axis label */}
          <text x="10" y="50" fontSize="5" fill="#a78bfa" transform="rotate(-90 2,50)" textAnchor="middle">
            Product Concentration
          </text>

          {/* X-axis label */}
          <text x="87" y="95" fontSize="5" fill="#a78bfa">Time →</text>
        </svg>
      </div>
    </div>
  );
}
