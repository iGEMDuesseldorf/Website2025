import React, { useState, useEffect } from 'react';

export default function ExpensiveHardware() {
  const [time, setTime] = useState(0);
  const [hardwareCost, setHardwareCost] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHardwareCost(c => Math.min(17000, c + 50));
  }, [time]);

  return (
    <div
      className="rounded-2xl border-3 border-purple-400 p-6 flex flex-col"
      style={{ minHeight: '400px', background: 'transparent' }}
    >
      <h2 className="text-xl font-bold text-white text-center mb-6">Expensive Hardware</h2>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          {/* Visible special box for the number */}
          <div className="inline-block bg-purple-900 text-purple-300 font-extrabold text-8xl px-12 py-10 rounded-3xl shadow-2xl mb-4">
            ${hardwareCost.toLocaleString()}
          </div>
          <div className="text-purple-200 text-sm">and counting...</div>
        </div>
      </div>

    </div>
  );
}
