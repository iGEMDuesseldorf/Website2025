import React, { useState } from 'react';

export default function FuturePerspectives() {
  const points = [
    {
      title: 'Plug and play principle',
      description:
        'Our system allows for easy modulation of used sensors and probes, and offers many great opportunities for further adaptation and development. In the long term, this system could even be scaled up to perform large experiments without prohibitive costs.'
    },
    {
      title: 'Control strategy',
      description:
        'While we currently employ a PI-controller for the pH, future collaborators could focus on implementing a broader strategy that involves the control of further parameters and machine-learning supported control mechanisms.'
    },
    {
      title: 'Ratiometric Biosensor',
      description:
        'Our work serves as a proof of concept that can be adapted to various other pathways. A natural next step is the induction of more than one key enzymatic step, to further increase stability and reduce unwanted complications.'
    }
  ];

  const [flipped, setFlipped] = useState(Array(points.length).fill(false));

  const toggleFlip = (index) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        The future looks bright and the tools we developed can help you shape it.
      </h2>
      <p className="text-purple-200 mb-6">
        The chemostat opens perspectives for affordable bioproduction experiments, especially for other iGEM teams and smaller research groups. Explore the potentials our project holds:
      </p>

      <ul className="flex flex-col gap-4">
        {points.map((point, index) => (
          <li
            key={index}
            className="perspective"
            style={{ perspective: '1000px' }}
          >
            <div
              onClick={() => toggleFlip(index)}
              className={`
                relative w-full cursor-pointer h-40
                transform transition-transform duration-500
                ${flipped[index] ? 'rotateY-180' : 'rotateY-0'}
              `}
            >
              {/* Front side (title) */}
              <div className="absolute inset-0 bg-purple-800/70 text-purple-100 flex items-center justify-center rounded-xl shadow-lg backface-hidden p-6 text-center">
                <h3 className="text-xl font-semibold">{point.title}</h3>
              </div>

              {/* Back side (description) */}
              <div className="absolute inset-0 bg-purple-700 text-purple-200 flex items-center justify-center rounded-xl shadow-lg backface-hidden rotateY-180 p-6 text-center text-sm">
                {point.description}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
