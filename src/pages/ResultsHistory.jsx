import React from 'react';
import { Link } from 'react-router-dom';

const ResultsHistory = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Historique des résultats</h1>
      <p className="text-gray-600 mb-6">Liste de vos tentatives précédentes (placeholder).</p>
      <Link to="/profile" className="text-blue-600">Retour au profil</Link>
    </div>
  );
};

export default ResultsHistory;
