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
      <h2 className="text-xl font-bold text-white text-center mb-3">
        Expensive Hardware
      </h2>
      <div className="flex-1 flex items-center justify-center" style={{ paddingTop: '2rem' }}>
        <div className="text-center">
          <div 
            style={{ 
              backgroundColor: '#581c87',
              border: '3px solid #a78bfa',
              padding: '1.5rem 3rem',
              borderRadius: '2rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
              display: 'inline-block',
              marginBottom: '0.5rem'
            }}
          >
            <div style={{ 
              fontSize: '3.0rem', 
              fontWeight: 'bold', 
              color: '#fde047',
              lineHeight: '1'
            }}>
              ${hardwareCost.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}