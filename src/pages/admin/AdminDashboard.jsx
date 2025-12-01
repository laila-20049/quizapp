import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard (placeholder)</h1>
      <p className="text-gray-600">Tableau de bord administrateur — gérer quiz et utilisateurs.</p>
      <div className="mt-6">
        <Link to="/admin/quiz/create" className="text-blue-600">Créer un quiz</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
