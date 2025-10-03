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
    <div className="bg-purple-950 bg-opacity-60 rounded-2xl border-3 border-purple-400 p-6 flex flex-col" style={{ minHeight: '400px' }}>
      <h2 className="text-xl font-bold text-white text-center mb-3">📉 Unstable Production</h2>
      <div className="flex-1 relative pl-6 pb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ minHeight: '200px' }}>
          <line x1="0" x2="0" y1="0" y2="100" stroke="#a78bfa" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          <line x1="0" x2="100" y1="100" y2="100" stroke="#a78bfa" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          <line x1="0" x2="100" y1="30" y2="30" stroke="#4ade80" strokeWidth="0.5" strokeDasharray="2,2" vectorEffect="non-scaling-stroke" />
          
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
        <div className="absolute left-0 top-0 text-purple-300 text-xs">100%</div>
        <div className="absolute left-0 bottom-0 text-purple-300 text-xs">0%</div>
        <div className="absolute bottom-0 right-0 text-purple-300 text-xs">Time →</div>
      </div>
      <p className="text-purple-200 text-center text-xs mt-2">
        **Unstable product concentration** 
      </p>
    </div>
  );
}