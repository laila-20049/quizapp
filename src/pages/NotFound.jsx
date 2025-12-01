import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold mb-4">404 — Page non trouvée</h1>
      <p className="text-gray-600 mb-6">La page que vous cherchez n'existe pas.</p>
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Retour à l'accueil</Link>
    </div>
  </div>
);

export default NotFound;
