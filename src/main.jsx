import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QuizProvider>
        <AppRouter />
      </QuizProvider>
    </AuthProvider>
  </React.StrictMode>,
);