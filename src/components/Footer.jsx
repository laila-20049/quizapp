import React from 'react';
import { GraduationCap, BookOpen, Trophy, Users, Mail } from 'lucide-react';

const FooterMobile = () => {
  return (
    <footer className="bg-gray-900 text-white lg:hidden">
      <div className="px-4 py-6">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <GraduationCap className="h-6 w-6 text-green-400" />
          <div className="text-center">
            <div className="text-lg font-bold">Moroccan<span className="text-green-400">Quiz</span></div>
            <div className="text-xs text-gray-400">University App</div>
          </div>
        </div>

        {/* Navigation mobile */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <a href="#" className="flex flex-col items-center text-gray-300 hover:text-white transition-colors">
            <BookOpen className="h-5 w-5 mb-1" />
            <span className="text-xs">Quiz</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-300 hover:text-white transition-colors">
            <Trophy className="h-5 w-5 mb-1" />
            <span className="text-xs">Classement</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-300 hover:text-white transition-colors">
            <Users className="h-5 w-5 mb-1" />
            <span className="text-xs">Communauté</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-300 hover:text-white transition-colors">
            <Mail className="h-5 w-5 mb-1" />
            <span className="text-xs">Contact</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-xs pt-4 border-t border-gray-700">
          © 2025 Moroccan Quiz App
        </div>
      </div>
    </footer>
  );
};

export default FooterMobile;