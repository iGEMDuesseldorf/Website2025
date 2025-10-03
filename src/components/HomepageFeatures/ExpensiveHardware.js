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
    <div
      className="rounded-2xl border-3 border-purple-400 p-6 flex flex-col"
      style={{ minHeight: '400px', background: 'transparent' }}
    >
      <h2 className="text-xl font-bold text-white text-center mb-3">💸 Expensive Hardware</h2>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          {/* Special box for the number */}
          <div className="inline-block bg-purple-700/20 text-purple-400 font-bold text-6xl px-8 py-6 rounded-xl shadow-lg mb-2">
            ${hardwareCost.toLocaleString()}
          </div>
          <div className="text-purple-200 text-sm">and counting...</div>
        </div>
      </div>
    </div>
  );
}
