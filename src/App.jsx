import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuizList from './pages/QuizList';
import QuizDetail from './pages/QuizDetail';
import QuizPlay from './pages/QuizPlay';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quizzes" element={<QuizList />} />
                <Route path="/quiz/:id" element={<QuizDetail />} />
                <Route path="/quiz/:id/play" element={
                  <ProtectedRoute>
                    <QuizPlay />
                  </ProtectedRoute>
                } />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;