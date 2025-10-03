import React, { useState, useEffect } from 'react';

export default function ExpensiveHardware() {
  const [time, setTime] = useState(0);
  const [hardwareCost, setHardwareCost] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHardwareCost((c) => Math.min(17000, c + 50));
  }, [time]);

  return (
    <div className="rounded-2xl border-3 border-purple-400 p-6 flex flex-col" style={{ minHeight: '400px', background: 'transparent' }}>
      <h2 className="text-xl font-bold text-white text-center mb-3" >
        Expensive Hardware
      </h2>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div 
            className="inline-block px-8 py-6 rounded-2xl shadow-2xl mb-2"
            style={{ 
              backgroundColor: '#581c87',
              border: '2px solid #a78bfa'
            }}
          >
            <div className="text-4xl font-bold text-yellow-300">
              ${hardwareCost.toLocaleString()}
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}