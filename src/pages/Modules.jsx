import React, { useState } from 'react';
import Modules from './components/Modules';

const ModuleBrowser = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('S1');

  const levels = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Filtres */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select 
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les semestres</option>
          {levels.map(level => (
            <option key={level} value={level}>
              Semestre {level}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des modules */}
      <Modules 
        selectedLevel={selectedLevel}
        mode="browse"
        showFilters={true}
      />
    </div>
  );
};