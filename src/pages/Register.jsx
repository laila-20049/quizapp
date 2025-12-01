import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  GraduationCap,
  MapPin,
  BookOpen,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Shield,
  Sparkles,
  ChevronLeft,
  Loader,
  Calendar,
  Users,
  Globe,
  Building,
  Target
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    university: '',
    faculty: '',
    level: '',
    city: '',
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);

  // Données de démonstration
  const demoUniversities = [
    { id: 1, name: "Université Hassan II", city: "Casablanca" },
    { id: 2, name: "Université Mohammed V", city: "Rabat" },
    { id: 3, name: "Université Cadi Ayyad", city: "Marrakech" },
    { id: 4, name: "Université Ibn Tofail", city: "Kénitra" },
    { id: 5, name: "Université Abdelmalek Essaâdi", city: "Tétouan" },
    { id: 6, name: "Université Sultan Moulay Slimane", city: "Beni Mellal" }
  ];

  const demoFaculties = [
    { id: 1, name: "Faculté des Sciences (FS)", universityId: 1 },
    { id: 2, name: "Faculté des Sciences et Techniques (FST)", universityId: 1 },
    { id: 3, name: "École Nationale des Sciences Appliquées (ENSA)", universityId: 2 },
    { id: 4, name: "Faculté de Droit (FD)", universityId: 2 },
    { id: 5, name: "Faculté des Sciences Économiques (FSE)", universityId: 3 },
    { id: 6, name: "Faculté de Médecine et de Pharmacie (FMP)", universityId: 3 }
  ];

  const levels = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'Master', 'Doctorat'];

  useEffect(() => {
    clearError();
    // Charger les données des universités et facultés
    setUniversities(demoUniversities);
    setFaculties(demoFaculties);
  }, [clearError]);

  useEffect(() => {
    // Calculer la force du mot de passe
    let strength = 0;
    if (formData.password.length >= 8) strength += 1;
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[0-9]/.test(formData.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
    setPasswordStrength(strength);
  }, [formData.password]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'firstName':
        if (!value) {
          newErrors.firstName = 'Le prénom est requis';
        } else if (value.length < 2) {
          newErrors.firstName = 'Le prénom doit contenir au moins 2 caractères';
        } else {
          delete newErrors.firstName;
        }
        break;
      
      case 'lastName':
        if (!value) {
          newErrors.lastName = 'Le nom est requis';
        } else if (value.length < 2) {
          newErrors.lastName = 'Le nom doit contenir au moins 2 caractères';
        } else {
          delete newErrors.lastName;
        }
        break;
      
      case 'email':
        if (!value) {
          newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Format d\'email invalide';
        } else if (!value.includes('.ma') && !value.includes('.com')) {
          newErrors.email = 'Veuillez utiliser une adresse email universitaire';
        } else {
          delete newErrors.email;
        }
        break;
      
      case 'password':
        if (!value) {
          newErrors.password = 'Le mot de passe est requis';
        } else if (value.length < 8) {
          newErrors.password = 'Au moins 8 caractères';
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password = 'Au moins une majuscule';
        } else if (!/[0-9]/.test(value)) {
          newErrors.password = 'Au moins un chiffre';
        } else {
          delete newErrors.password;
        }
        break;
      
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Confirmez votre mot de passe';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      
      case 'university':
        if (!value) {
          newErrors.university = 'Veuillez sélectionner votre université';
        } else {
          delete newErrors.university;
        }
        break;
      
      case 'level':
        if (!value) {
          newErrors.level = 'Veuillez sélectionner votre niveau';
        } else {
          delete newErrors.level;
        }
        break;
      
      case 'termsAccepted':
        if (!value) {
          newErrors.termsAccepted = 'Vous devez accepter les conditions';
        } else {
          delete newErrors.termsAccepted;
        }
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
    return !newErrors[name];
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: newValue 
    }));
    
    // Effacer la faculté si l'université change
    if (name === 'university') {
      setFormData(prev => ({ ...prev, faculty: '' }));
    }
    
    if (touched[name]) {
      validateField(name, newValue);
    }
  };

  const handleNextStep = () => {
    // Valider l'étape courante avant de continuer
    let isValid = true;
    const fieldsToValidate = currentStep === 1 
      ? ['firstName', 'lastName', 'email', 'password', 'confirmPassword']
      : ['university', 'level'];
    
    fieldsToValidate.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valider tous les champs
    const isStep1Valid = ['firstName', 'lastName', 'email', 'password', 'confirmPassword']
      .every(field => validateField(field, formData[field]));
    
    const isStep2Valid = ['university', 'level', 'termsAccepted']
      .every(field => validateField(field, formData[field]));
    
    if (!isStep1Valid || !isStep2Valid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        confirmPassword: true,
        university: true,
        level: true,
        termsAccepted: true
      });
      return;
    }

    // Préparer les données d'inscription
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      university: formData.university,
      faculty: formData.faculty,
      level: formData.level,
      phone: formData.phone || undefined,
      city: formData.city || undefined
    };

    const result = await register(userData);
    if (result.success) {
      navigate('/profile');
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return 'bg-gray-200';
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0: return 'Très faible';
      case 1: return 'Faible';
      case 2: return 'Moyen';
      case 3: return 'Fort';
      case 4: return 'Très fort';
      default: return '';
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
            currentStep === step
              ? 'bg-blue-500 text-white'
              : currentStep > step
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-500'
          }`}>
            {currentStep > step ? <CheckCircle2 className="h-5 w-5" /> : step}
          </div>
          {step < 2 && (
            <div className={`w-16 h-1 ${
              currentStep > step ? 'bg-green-500' : 'bg-gray-200'
            }`}></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Informations personnelles
              </h3>
              <p className="text-gray-600">
                Créez votre compte pour accéder à tous les quiz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prénom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    name="firstName"
                    type="text"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('firstName')}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.firstName && touched.firstName
                        ? 'border-red-300 focus:ring-red-500'
                        : formData.firstName && !errors.firstName
                        ? 'border-green-300 focus:ring-green-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {formData.firstName && !errors.firstName && (
                    <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.firstName && touched.firstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('lastName')}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.lastName && touched.lastName
                        ? 'border-red-300 focus:ring-red-500'
                        : formData.lastName && !errors.lastName
                        ? 'border-green-300 focus:ring-green-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {formData.lastName && !errors.lastName && (
                    <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.lastName && touched.lastName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.lastName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email universitaire
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    placeholder="prenom.nom@universite.ma"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email && touched.email
                        ? 'border-red-300 focus:ring-red-500'
                        : formData.email && !errors.email
                        ? 'border-green-300 focus:ring-green-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {formData.email && !errors.email && (
                    <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Utilisez votre email universitaire pour bénéficier des avantages étudiants
                </p>
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur('password')}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.password && touched.password
                        ? 'border-red-300 focus:ring-red-500'
                        : formData.password && !errors.password
                        ? 'border-green-300 focus:ring-green-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Force du mot de passe */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Force du mot de passe:</span>
                      <span className={`font-medium ${
                        passwordStrength === 1 ? 'text-red-600' :
                        passwordStrength === 2 ? 'text-orange-600' :
                        passwordStrength === 3 ? 'text-yellow-600' :
                        passwordStrength === 4 ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {errors.password && touched.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirmation du mot de passe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmez votre mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur('confirmPassword')}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? 'border-red-300 focus:ring-red-500'
                        : formData.confirmPassword && !errors.confirmPassword
                        ? 'border-green-300 focus:ring-green-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Informations académiques
              </h3>
              <p className="text-gray-600">
                Ces informations nous aident à vous proposer des quiz adaptés
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Université */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap className="inline h-4 w-4 mr-1" />
                  Université
                </label>
                <select
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  onBlur={() => handleBlur('university')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.university && touched.university
                      ? 'border-red-300 focus:ring-red-500'
                      : formData.university && !errors.university
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Sélectionnez votre université</option>
                  {universities.map(uni => (
                    <option key={uni.id} value={uni.name}>
                      {uni.name} - {uni.city}
                    </option>
                  ))}
                </select>
                {errors.university && touched.university && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.university}
                  </p>
                )}
              </div>

              {/* Faculté */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="inline h-4 w-4 mr-1" />
                  Faculté/École
                </label>
                <select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!formData.university}
                >
                  <option value="">Sélectionnez votre faculté</option>
                  {faculties
                    .filter(f => 
                      formData.university && 
                      universities.find(u => u.name === formData.university)?.id === f.universityId
                    )
                    .map(faculty => (
                      <option key={faculty.id} value={faculty.name}>
                        {faculty.name}
                      </option>
                    ))}
                </select>
                {!formData.university && (
                  <p className="mt-1 text-sm text-gray-500">
                    Sélectionnez d'abord votre université
                  </p>
                )}
              </div>

              {/* Niveau */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Target className="inline h-4 w-4 mr-1" />
                  Niveau d'études
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  onBlur={() => handleBlur('level')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.level && touched.level
                      ? 'border-red-300 focus:ring-red-500'
                      : formData.level && !errors.level
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Sélectionnez votre niveau</option>
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.level && touched.level && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.level}
                  </p>
                )}
              </div>

              {/* Téléphone (optionnel) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Téléphone (optionnel)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+212 6XX-XXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Conditions d'utilisation */}
              <div className="md:col-span-2">
                <label className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    onBlur={() => handleBlur('termsAccepted')}
                    className="h-5 w-5 text-blue-600 mt-0.5"
                  />
                  <div>
                    <span className={`font-medium ${
                      errors.termsAccepted && touched.termsAccepted
                        ? 'text-red-600'
                        : 'text-gray-900'
                    }`}>
                      J'accepte les conditions d'utilisation et la politique de confidentialité
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      En créant un compte, vous acceptez nos{' '}
                      <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                        Conditions d'utilisation
                      </Link>{' '}
                      et notre{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                        Politique de confidentialité
                      </Link>
                    </p>
                    {errors.termsAccepted && touched.termsAccepted && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.termsAccepted}
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Avantages */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Avantages de votre compte
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Accès à tous les quiz gratuits
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Suivi de votre progression
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Participation aux classements
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Quiz personnalisés selon votre niveau
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
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
            {/* Bannière */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm mb-6">
                <UserPlus className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Créer un compte
              </h1>
              <p className="text-blue-100">
                Rejoignez la communauté des étudiants marocains
              </p>
            </div>

            {/* Indicateur d'étapes */}
            <div className="px-8 pt-8">
              {renderStepIndicator()}
            </div>

            {/* Formulaire */}
            <form className="p-8" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}

              {/* Contenu de l'étape */}
              {renderStepContent()}

              {/* Navigation */}
              <div className="flex justify-between pt-8 border-t border-gray-200">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    Retour
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    Déjà un compte ?
                  </Link>
                )}

                {currentStep < 2 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors font-semibold"
                  >
                    Continuer
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <Loader className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Shield className="h-5 w-5" />
                        Créer mon compte
                        <Sparkles className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Connexion */}
              <div className="text-center mt-8">
                <p className="text-gray-600">
                  Vous avez déjà un compte ?{' '}
                  <Link 
                    to="/login" 
                    className="font-semibold text-blue-600 hover:text-blue-500"
                  >
                    Connectez-vous
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Informations supplémentaires */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-3">
                <Users className="h-6 w-6" />
              </div>
              <div className="font-semibold text-gray-900">12K+ Étudiants</div>
              <div className="text-sm text-gray-600">Déjà inscrits</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-3">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="font-semibold text-gray-900">500+ Quiz</div>
              <div className="text-sm text-gray-600">Disponibles</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-3">
                <Globe className="h-6 w-6" />
              </div>
              <div className="font-semibold text-gray-900">24 Universités</div>
              <div className="text-sm text-gray-600">Partenaire</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;