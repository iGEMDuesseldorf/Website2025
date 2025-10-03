import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChemostatSimulator() {
  const [params, setParams] = useState({
    muMax: 1.14,
    kprod: 0.15,
    kcons: 0.3,
    spikeAmount: 5,
    spikeInterval: 10
  });
  
  const [spikeTimes, setSpikeTimes] = useState([10, 20, 30, 40, 50, 60, 70, 80, 90]);
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState([]);

  const runSimulation = () => {
    setIsRunning(true);
    
    // Constants
    const K = 5;
    const alpha_ind = 0.01;
    const D = 0.1;
    const cr = 5;
    const s = 0.3;
    const v = 0.2;
    const ksyn = 0.02;
    const n = 2;
    const Ki = 0.01;
    const kdeg = 0.001;
    const Ir = 0.05;
    const kbase = 0.002;
    
    const maxT = 100;
    const dt = 0.33;
    const steps = Math.floor(maxT / dt);
    
    
    let w = 2, c = 5, Pr = 0, P = 0, I = 0, mu = 0;
    const results = [];
    
    for (let i = 0; i < steps; i++) {
      const t = i * dt;
      
      // Check for inducer spikes
      let spike = 0;
      for (const ts of spikeTimes) {
        if (Math.abs(t - ts) < 0.5) {
          spike = params.spikeAmount;
        }
      }
      
      // Calculate derivatives
      const didt = D * (Ir - I) - params.kcons * I + spike;
      mu = params.muMax * (1 - w / K) - (alpha_ind * Pr);
      const dwdt = w * (mu - D);
      const dcdt = D * (cr - c) - s * mu * w;
      const dprdt = ksyn * (Math.pow(I, n) / (Math.pow(Ki, n) + Math.pow(I, n))) - kdeg * Pr - D * Pr;
      const dpdt = kbase * w + params.kprod * Pr * w - D * P;
      
      // Update state (Euler method)
      w += dwdt * dt;
      c += dcdt * dt;
      Pr += dprdt * dt;
      P += dpdt * dt;
      I += didt * dt;
      
      // Prevent negative values
      w = Math.max(0, w);
      c = Math.max(0, c);
      Pr = Math.max(0, Pr);
      P = Math.max(0, P);
      I = Math.max(0, I);
      
      if (i % 3 === 0) {
        results.push({
          time: parseFloat(t.toFixed(1)),
          biomass: parseFloat(w.toFixed(3)),
          substrate: parseFloat(c.toFixed(3)),
          enzyme: parseFloat(Pr.toFixed(3)),
          product: parseFloat(P.toFixed(3)),
          inducer: parseFloat(I.toFixed(3)),
          productivity: parseFloat((kbase * w + params.kprod * Pr * w).toFixed(3))
        });
      }
    }
    
    setData(results);
    setIsRunning(false);
  };

  useEffect(() => {
    runSimulation();
  }, []);

  const addSpike = () => {
    const newTime = spikeTimes.length > 0 ? Math.max(...spikeTimes) + 10 : 10;
    if (newTime <= 100) {
      setSpikeTimes([...spikeTimes, newTime]);
    }
  };

  const removeSpike = (index) => {
    setSpikeTimes(spikeTimes.filter((_, i) => i !== index));
  };

  const updateSpikeTime = (index, value) => {
    const newSpikes = [...spikeTimes];
    newSpikes[index] = parseFloat(value);
    setSpikeTimes(newSpikes.sort((a, b) => a - b));
  };

  return (
    <div className="w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-6">
          🧪 Interactive Chemostat Simulator
        </h1>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Parameters */}
          <div className="bg-purple-950 bg-opacity-60 rounded-xl border-2 border-purple-400 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Parameters</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-purple-200 text-sm block mb-1">
                  Max Growth Rate (μ_max): {params.muMax.toFixed(2)} h⁻¹
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={params.muMax}
                  onChange={(e) => setParams({...params, muMax: parseFloat(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-purple-200 text-sm block mb-1">
                  Production Rate (k_prod): {params.kprod.toFixed(2)} g/(g·h)
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="0.5"
                  step="0.05"
                  value={params.kprod}
                  onChange={(e) => setParams({...params, kprod: parseFloat(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-purple-200 text-sm block mb-1">
                  Inducer Consumption Rate (k_cons): {params.kcons.toFixed(2)} h⁻¹
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={params.kcons}
                  onChange={(e) => setParams({...params, kcons: parseFloat(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-purple-200 text-sm block mb-1">
                  Spike Amount: {params.spikeAmount.toFixed(1)} g/L
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="0.5"
                  value={params.spikeAmount}
                  onChange={(e) => setParams({...params, spikeAmount: parseFloat(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Inducer Spikes */}
          <div className="bg-purple-950 bg-opacity-60 rounded-xl border-2 border-purple-400 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Inducer Spike Schedule</h2>
            
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {spikeTimes.map((time, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={time}
                    onChange={(e) => updateSpikeTime(index, e.target.value)}
                    className="flex-1 px-3 py-1 rounded bg-purple-800 text-white border border-purple-500"
                  />
                  <span className="text-purple-200 text-sm">hours</span>
                  <button
                    onClick={() => removeSpike(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addSpike}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-2"
            >
              + Add Spike
            </button>

            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-600"
            >
              {isRunning ? 'Running...' : '▶ Run Simulation'}
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product */}
          <div className="bg-purple-950 bg-opacity-60 rounded-xl border-2 border-purple-400 p-4">
            <h3 className="text-lg font-bold text-white mb-2">Product Concentration</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#581c87" />
                <XAxis dataKey="time" stroke="#c4b5fd" label={{ value: 'Time (h)', position: 'insideBottom', offset: -5, fill: '#c4b5fd' }} />
                <YAxis stroke="#c4b5fd" label={{ value: 'g/L', angle: -90, position: 'insideLeft', fill: '#c4b5fd' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #7c3aed' }} />
                <Line type="monotone" dataKey="product" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Biomass */}
          <div className="bg-purple-950 bg-opacity-60 rounded-xl border-2 border-purple-400 p-4">
            <h3 className="text-lg font-bold text-white mb-2">Biomass</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#581c87" />
                <XAxis dataKey="time" stroke="#c4b5fd" label={{ value: 'Time (h)', position: 'insideBottom', offset: -5, fill: '#c4b5fd' }} />
                <YAxis stroke="#c4b5fd" label={{ value: 'g/L', angle: -90, position: 'insideLeft', fill: '#c4b5fd' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #7c3aed' }} />
                <Line type="monotone" dataKey="biomass" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Enzyme */}
          <div className="bg-purple-950 bg-opacity-60 rounded-xl border-2 border-purple-400 p-4">
            <h3 className="text-lg font-bold text-white mb-2">Enzyme Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#581c87" />
                <XAxis dataKey="time" stroke="#c4b5fd" label={{ value: 'Time (h)', position: 'insideBottom', offset: -5, fill: '#c4b5fd' }} />
                <YAxis stroke="#c4b5fd" />
                <Tooltip contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #7c3aed' }} />
                <Line type="monotone" dataKey="enzyme" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Inducer */}
          <div className="bg-purple-950 bg-opacity-60 rounded-xl border-2 border-purple-400 p-4">
            <h3 className="text-lg font-bold text-white mb-2">Inducer Concentration</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#581c87" />
                <XAxis dataKey="time" stroke="#c4b5fd" label={{ value: 'Time (h)', position: 'insideBottom', offset: -5, fill: '#c4b5fd' }} />
                <YAxis stroke="#c4b5fd" label={{ value: 'g/L', angle: -90, position: 'insideLeft', fill: '#c4b5fd' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #7c3aed' }} />
                <Line type="monotone" dataKey="inducer" stroke="#a855f7" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-purple-800 bg-opacity-30 rounded-xl p-4 border border-purple-400">
          <p className="text-white text-sm text-center">
            💡 <span className="font-bold">Tip:</span> Adjust the parameters and spike timing to see how they affect product formation. 
            Try increasing the spike amount or changing the consumption rate to optimize production!
          </p>
        </div>
      </div>
    </div>
  );
}