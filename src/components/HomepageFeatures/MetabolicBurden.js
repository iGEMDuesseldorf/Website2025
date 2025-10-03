<div className="rounded-2xl border-3 border-purple-400 p-6 flex flex-col" style={{ minHeight: '400px', background: 'transparent' }}>
  <h2 className="text-xl font-bold text-white text-center mb-3">Metabolic Burden</h2>
  <div className="flex-1 flex items-center justify-center relative" style={{ minHeight: '250px' }}>
    <div className="relative w-full max-w-sm aspect-square">
      {/* Petri dish */}
      <div className="absolute inset-0 rounded-full border-4 border-gray-400 shadow-2xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-100">
        {/* Agar medium */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 opacity-60"></div>

        {/* Cells */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {cells.map(cell => (
            <g key={cell.id}>
              {/* Cell glow */}
              <circle
                cx={cell.x}
                cy={cell.y}
                r={cell.size / 6} // slightly larger
                fill={getColorFromHealth(cell.health)}
                opacity="0.3"
              />
              {/* Main cell */}
              <circle
                cx={cell.x}
                cy={cell.y}
                r={cell.size / 8} // slightly larger
                fill={getColorFromHealth(cell.health)}
                opacity="0.9"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="0.3"
              >
                <animate
                  attributeName="r"
                  values={`${cell.size / 8};${cell.size / 8 + 0.5};${cell.size / 8}`}
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>

        {/* Petri dish shine */}
        <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-white opacity-20 blur-xl"></div>
      </div>

      {/* Petri dish lid rim */}
      <div className="absolute inset-0 rounded-full border-2 border-gray-300 pointer-events-none" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}></div>
    </div>
  </div>
</div>
