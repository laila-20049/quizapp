import React from 'react';
import { useParams } from 'react-router-dom';

const QuizEdit = () => {
  const { id } = useParams();
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Modifier le Quiz (placeholder)</h1>
      <p className="text-gray-600">Modifier le quiz ID: {id}</p>
    </div>
  );
};

export default QuizEdit;
