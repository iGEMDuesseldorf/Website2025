import React, { useState, useEffect } from 'react';

export default function BioproductionOscillations() {
  const [time, setTime] = useState(0);
  const [productHistory, setProductHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Create oscillating product concentration that goes below target
    const baseOscillation = 45 + 30 * Math.sin(time * 0.12) + 20 * Math.sin(time * 0.35);
    const noise = (Math.random() - 0.5) * 15;
    const productLevel = Math.max(10, Math.min(85, baseOscillation + noise));
    
    setProductHistory((prev) => [...prev, productLevel]);
  }, [time]);

  const maxPoints = 200;
  const displayHistory = productHistory.slice(-maxPoints);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-3">Unstable Production 📉</h1>
        <p className="text-purple-200 text-xl">
          Product concentration goes up and down... and up... and down...
        </p>
      </div>

      {/* Main chart */}
      <div className="relative w-full max-w-4xl h-96 bg-purple-950 bg-opacity-50 rounded-3xl border-4 border-purple-400 shadow-2xl p-8">
        
        {/* Target line */}
        <div 
          className="absolute left-8 right-8 border-t-2 border-dashed border-green-400"
          style={{ top: '35%' }}
        >
          <span className="absolute -top-6 right-0 text-green-300 text-sm font-bold bg-purple-900 px-3 py-1 rounded-full">
            🎯 Target
          </span>
        </div>

        {/* Chart area */}
        <div className="absolute left-8 right-8 top-8 bottom-8">
          <svg className="w-full h-full">
            {/* Grid lines */}
            {[25, 50, 75].map((val) => (
              <line
                key={val}
                x1="0"
                x2="100%"
                y1={`${100 - val}%`}
                y2={`${100 - val}%`}
                stroke="#581c87"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}

            {/* Product concentration line */}
            {displayHistory.length > 1 && (
              <polyline
                points={displayHistory
                  .map((val, i) => {
                    const x = (i / (maxPoints - 1)) * 100;
                    const y = 100 - val;
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#c084fc"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(192, 132, 252, 0.8))'
                }}
              />
            )}

            {/* Current value glow */}
            {displayHistory.length > 0 && (
              <>
                <circle
                  cx="100%"
                  cy={`${100 - displayHistory[displayHistory.length - 1]}%`}
                  r="12"
                  fill="#a855f7"
                  opacity="0.3"
                  className="animate-ping"
                />
                <circle
                  cx="100%"
                  cy={`${100 - displayHistory[displayHistory.length - 1]}%`}
                  r="6"
                  fill="#c084fc"
                />
              </>
            )}
          </svg>
        </div>

        {/* Axis labels */}
        <div className="absolute left-2 top-8 text-purple-300 text-xs font-bold">100%</div>
        <div className="absolute left-2 bottom-8 text-purple-300 text-xs font-bold">0%</div>
        <div className="absolute bottom-2 left-8 text-purple-300 text-sm font-bold">Time →</div>
      </div>

      {/* Fun caption */}
      <div className="mt-8 max-w-2xl text-center">
        <p className="text-purple-200 text-lg leading-relaxed">
          <span className="font-bold text-yellow-300">Why so wobbly?</span> Metabolic bottlenecks + 
          limited feedback control = chaos! 🎢
        </p>
        <p className="text-purple-300 text-sm mt-2">
          This is what happens when your cells can't keep their metabolic pathways balanced.
        </p>
      </div>
    </div>
  );
}