import React, { useState, useEffect } from 'react';
import {
  Microscope,
  FlaskRound as Flask,
  Atom,
  Mountain,
  Globe2,
  Leaf,
  Users,
  ScrollText,
  Wrench
} from 'lucide-react';
import DisciplineCard from './DisciplineCard';

const disciplines = [
  {
    id: 1,
    title: 'Biology',
    focus: 'Study of living organisms and their interactions with the environment.',
    relevance: 'Understanding ecosystems, biodiversity, and the impacts of pollutants on flora and fauna.',
    icon: <Microscope className="w-6 h-6 text-green-600" />,
  },
  {
    id: 2,
    title: 'Chemistry',
    focus: 'Chemical processes and substances in the environment.',
    relevance: 'Analyzing pollutants, chemical cycles, and the chemical basis of environmental health.',
    icon: <Flask className="w-6 h-6 text-blue-600" />,
  },
  {
    id: 3,
    title: 'Physics',
    focus: 'Physical principles governing natural processes.',
    relevance: 'Studying energy transfer, climate systems, and the physical impact of environmental changes.',
    icon: <Atom className="w-6 h-6 text-purple-600" />,
  },
  {
    id: 4,
    title: 'Geology',
    focus: 'Earth\'s structure, materials, and processes.',
    relevance: 'Understanding soil composition, natural resource distribution, and geological hazards.',
    icon: <Mountain className="w-6 h-6 text-amber-600" />,
  },
  {
    id: 5,
    title: 'Geography',
    focus: 'Spatial aspects of natural and human phenomena.',
    relevance: 'Mapping environmental changes, studying land use patterns, and assessing the impact of human activities.',
    icon: <Globe2 className="w-6 h-6 text-cyan-600" />,
  },
  {
    id: 6,
    title: 'Ecology',
    focus: 'Interactions between organisms and their environment.',
    relevance: 'Understanding ecosystem dynamics, species interactions, and environmental change effects.',
    icon: <Leaf className="w-6 h-6 text-emerald-600" />,
  },
  {
    id: 7,
    title: 'Social Sciences',
    focus: 'Human behavior, policies, and economics related to the environment.',
    relevance: 'Studying social dimensions of environmental issues, public policy, and economic impacts.',
    icon: <Users className="w-6 h-6 text-red-600" />,
  },
  {
    id: 8,
    title: 'Environmental Policy',
    focus: 'Development and implementation of environmental resource management strategies.',
    relevance: 'Crafting regulations and practices for sustainable resource use and pollution control.',
    icon: <ScrollText className="w-6 h-6 text-indigo-600" />,
  },
  {
    id: 9,
    title: 'Environmental Engineering',
    focus: 'Application of engineering principles to improve environmental quality.',
    relevance: 'Designing technologies for waste treatment, pollution control, and sustainable infrastructure.',
    icon: <Wrench className="w-6 h-6 text-orange-600" />,
  },
];

const calculateNodePositions = (containerWidth, containerHeight) => {
  const center = { x: containerWidth / 2, y: containerHeight / 2 };
  const radius = Math.min(containerWidth, containerHeight) * 0.35;
  const positions = [];

  positions.push({ x: center.x, y: center.y });

  const angleStep = (2 * Math.PI) / (disciplines.length - 1);
  for (let i = 1; i < disciplines.length; i++) {
    const angle = angleStep * (i - 1);
    positions.push({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    });
  }

  return positions;
};

const EnvironmentalStudies = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [nodePositions, setNodePositions] = useState([]);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('node-container');
      if (container) {
        setContainerDimensions({
          width: container.offsetWidth,
          height: container.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (containerDimensions.width && containerDimensions.height) {
      setNodePositions(calculateNodePositions(containerDimensions.width, containerDimensions.height));
    }
  }, [containerDimensions]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            The Multidisciplinary Nature of Environmental Studies
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Environmental Studies combines insights and methods from various scientific and social 
            disciplines to address complex environmental issues and develop sustainable solutions.
          </p>
        </div>

        <div 
          id="node-container" 
          className="relative h-[800px] mb-8"
        >
          {nodePositions.length > 0 && disciplines.map((discipline, index) => (
            <DisciplineCard
              key={discipline.id}
              {...discipline}
              position={nodePositions[index]}
              isSelected={selectedDiscipline === discipline.id}
              onClick={() => setSelectedDiscipline(discipline.id === selectedDiscipline ? null : discipline.id)}
            />
          ))}

          <svg 
            className="absolute inset-0 pointer-events-none z-0" 
            width="100%" 
            height="100%"
          >
            {nodePositions.length > 0 && nodePositions.map((position, index) => {
              if (index === 0) return null;
              return (
                <line
                  key={index}
                  x1={nodePositions[0].x}
                  y1={nodePositions[0].y}
                  x2={position.x}
                  y2={position.y}
                  stroke="rgba(59, 130, 246, 0.2)"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Integration and Application
          </h2>
          <div className="backdrop-blur-lg bg-white/30 rounded-xl p-6 max-w-3xl mx-auto">
            <p className="text-gray-700 mb-4">
              By integrating knowledge from these diverse fields, Environmental Studies provides a 
              holistic view of environmental issues. This multidisciplinary approach is critical for:
            </p>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Diagnosing Problems: Identifying root causes and interconnections</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Developing Solutions: Creating effective and sustainable strategies</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Educating and Advocating: Raising awareness and influencing policies</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalStudies;

