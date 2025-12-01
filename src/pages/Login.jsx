import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  LogIn, 
  BookOpen, 
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  Loader
} from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirection après connexion
  const from = location.state?.from?.pathname || '/profile';

  useEffect(() => {
    // Clear errors when component mounts
    clearError();
  }, [clearError]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Format d\'email invalide';
        } else {
          delete newErrors.email;
        }
        break;
      
      case 'password':
        if (!value) {
          newErrors.password = 'Le mot de passe est requis';
        } else if (value.length < 6) {
          newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        } else {
          delete newErrors.password;
        }
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validation en temps réel si le champ a déjà été touché
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marquer tous les champs comme touchés
    setTouched({ email: true, password: true });
    
    // Valider tous les champs
    const isEmailValid = validateField('email', formData.email);
    const isPasswordValid = validateField('password', formData.password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  const isFormValid = formData.email && formData.password && Object.keys(errors).length === 0;

  // Données de démonstration pour les comptes de test
  const demoAccounts = [
    { email: 'admin@quiz.ma', password: 'password', role: 'Admin' },
    { email: 'etudiant@um5.ma', password: 'password', role: 'Étudiant' },
    { email: 'prof@uh2.ma', password: 'password', role: 'Professeur' }
  ];

  const fillDemoAccount = (account) => {
    setFormData({
      email: account.email,
      password: account.password
    });
    setTouched({ email: true, password: true });
    setErrors({});
    clearError();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl group-hover:scale-110 transition-transform">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                MoroccanQuiz
              </div>
              <div className="text-xs text-gray-500 -mt-1">University App</div>
            </div>
          </Link>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm mb-4">
                <LogIn className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Connexion
              </h2>
              <p className="text-blue-100">
                Accédez à votre espace étudiant
              </p>
            </div>

            {/* Formulaire */}
            <form className="p-8 space-y-6" onSubmit={handleSubmit}>
              {/* Champ Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email universitaire
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${
                      errors.email ? 'text-red-400' : formData.email ? 'text-green-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre.email@universite.ma"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                      errors.email && touched.email
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                        : formData.email && !errors.email
                        ? 'border-green-300 focus:ring-green-500 focus:border-green-500 bg-green-50'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white'
                    }`}
                    required
                  />
                  {formData.email && !errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.email && touched.email && (
                  <div className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Champ Mot de passe */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${
                      errors.password ? 'text-red-400' : formData.password ? 'text-green-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur('password')}
                    className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                      errors.password && touched.password
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                        : formData.password && !errors.password
                        ? 'border-green-300 focus:ring-green-500 focus:border-green-500 bg-green-50'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <div className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Options supplémentaires */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Erreur globale */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-xl text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <Loader className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    <LogIn className="h-6 w-6 mr-2 group-hover:translate-x-1 transition-transform" />
                    Se connecter
                  </>
                )}
              </button>

              {/* Lien d'inscription */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Nouveau sur MoroccanQuiz ?{' '}
                  <Link 
                    to="/register" 
                    className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Créer un compte
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Comptes de démonstration */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">
              🚀 Comptes de démonstration
            </h3>
            <div className="space-y-3">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => fillDemoAccount(account)}
                  className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors group"
                >
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {account.email}
                    </div>
                    <div className="text-xs text-gray-500">
                      {account.role} • Mot de passe: {account.password}
                    </div>
                  </div>
                  <BookOpen className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              Cliquez sur un compte pour remplir automatiquement le formulaire
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              En vous connectant, vous acceptez nos{' '}
              <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                conditions d'utilisation
              </Link>{' '}
              et notre{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;