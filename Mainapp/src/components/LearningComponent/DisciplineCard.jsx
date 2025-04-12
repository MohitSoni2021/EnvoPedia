import React from 'react';
import { motion } from 'framer-motion';

const DisciplineCard = ({ 
  title, 
  focus, 
  relevance, 
  icon, 
  position, 
  isSelected,
  onClick 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: position.x,
        y: position.y,
      }}
      whileHover={{ scale: 1.05 }}
      className={`
        absolute transform -translate-x-1/2 -translate-y-1/2
        backdrop-blur-lg ${isSelected ? 'bg-white/50' : 'bg-white/30'} 
        rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300
        cursor-pointer w-64
        ${isSelected ? 'z-20 ring-2 ring-blue-400' : 'z-10'}
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white/40 rounded-lg shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{title}</h3>
          {isSelected && (
            <div className="space-y-2 animate-fadeIn">
              <div>
                <p className="text-xs font-medium text-gray-700">Focus:</p>
                <p className="text-xs text-gray-600">{focus}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700">Relevance:</p>
                <p className="text-xs text-gray-600">{relevance}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DisciplineCard;
