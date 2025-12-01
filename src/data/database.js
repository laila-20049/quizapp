// Base de données simulée avec toutes les tables et relations

export const Database = {
  // ========== UTILISATEURS ==========
  users: [
    {
      id: 1,
      email: "admin@quiz.ma",
      password: "hashed_password",
      firstName: "Ahmed",
      lastName: "Alaoui",
      role: "admin",
      avatar: null,
      universityId: 1,
      facultyId: 1,
      level: "S6",
      isPro: true,
      subscription: "premium",
      createdAt: "2024-01-15T10:00:00Z",
      lastLogin: "2024-01-20T14:30:00Z",
      isActive: true,
      permissions: ["manage_quizzes", "manage_users", "view_analytics"]
    },
    {
      id: 2,
      email: "etudiant@um5.ma",
      password: "hashed_password",
      firstName: "Fatima",
      lastName: "Zahra",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      universityId: 2,
      facultyId: 3,
      level: "S3",
      isPro: false,
      subscription: "free",
      createdAt: "2024-01-10T09:15:00Z",
      lastLogin: "2024-01-20T16:45:00Z",
      isActive: true,
      permissions: ["take_quiz", "view_profile"]
    },
    {
      id: 3,
      email: "prof@uh2.ma",
      password: "hashed_password",
      firstName: "Dr. Mohammed",
      lastName: "Berrada",
      role: "professor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      universityId: 1,
      facultyId: 2,
      level: null,
      isPro: true,
      subscription: "premium",
      createdAt: "2024-01-05T08:00:00Z",
      lastLogin: "2024-01-19T11:20:00Z",
      isActive: true,
      permissions: ["create_quiz", "manage_own_quizzes", "view_analytics"]
    }
  ],

  // ========== UNIVERSITÉS ==========
  universities: [
    {
      id: 1,
      name: "Université Hassan II",
      acronym: "UH2",
      city: "Casablanca",
      logo: "https://via.placeholder.com/100x100/3B82F6/FFFFFF?text=UH2",
      website: "https://www.uh2.ac.ma",
      description: "Université publique marocaine située à Casablanca",
      isActive: true
    },
    {
      id: 2,
      name: "Université Mohammed V",
      acronym: "UM5",
      city: "Rabat",
      logo: "https://via.placeholder.com/100x100/10B981/FFFFFF?text=UM5",
      website: "https://www.um5.ac.ma",
      description: "Université publique marocaine située à Rabat",
      isActive: true
    },
    {
      id: 3,
      name: "Université Cadi Ayyad",
      acronym: "UCA",
      city: "Marrakech",
      logo: "https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=UCA",
      website: "https://www.uca.ma",
      description: "Université publique marocaine située à Marrakech",
      isActive: true
    },
    {
      id: 4,
      name: "Université Ibn Tofail",
      acronym: "UIT",
      city: "Kénitra",
      logo: "https://via.placeholder.com/100x100/EF4444/FFFFFF?text=UIT",
      website: "https://www.uit.ac.ma",
      description: "Université publique marocaine située à Kénitra",
      isActive: true
    }
  ],

  // ========== FACULTÉS ==========
  faculties: [
    {
      id: 1,
      name: "Faculté des Sciences",
      acronym: "FS",
      universityId: 1,
      description: "Faculté des Sciences de l'Université Hassan II"
    },
    {
      id: 2,
      name: "Faculté des Sciences et Techniques",
      acronym: "FST",
      universityId: 1,
      description: "FST de l'Université Hassan II"
    },
    {
      id: 3,
      name: "École Nationale des Sciences Appliquées",
      acronym: "ENSA",
      universityId: 2,
      description: "ENSA de l'Université Mohammed V"
    },
    {
      id: 4,
      name: "Faculté des Sciences Juridiques, Économiques et Sociales",
      acronym: "FSJES",
      universityId: 2,
      description: "FSJES de l'Université Mohammed V"
    },
    {
      id: 5,
      name: "Faculté de Médecine et de Pharmacie",
      acronym: "FMP",
      universityId: 3,
      description: "FMP de l'Université Cadi Ayyad"
    }
  ],

  // ========== MATIÈRES ==========
  subjects: [
    {
      id: 1,
      name: "Programmation Python",
      category: "Informatique",
      icon: "💻",
      description: "Programmation en Python et algorithmique",
      color: "blue"
    },
    {
      id: 2,
      name: "Algèbre Linéaire",
      category: "Mathématiques",
      icon: "📊",
      description: "Matrices, espaces vectoriels, valeurs propres",
      color: "green"
    },
    {
      id: 3,
      name: "Électromagnétisme",
      category: "Physique",
      icon: "⚡",
      description: "Champs électriques et magnétiques",
      color: "purple"
    },
    {
      id: 4,
      name: "Droit Constitutionnel",
      category: "Droit",
      icon: "⚖️",
      description: "Droit constitutionnel marocain et comparé",
      color: "red"
    },
    {
      id: 5,
      name: "Microéconomie",
      category: "Économie",
      icon: "💰",
      description: "Théorie du consommateur et du producteur",
      color: "yellow"
    },
    {
      id: 6,
      name: "Biologie Cellulaire",
      category: "Sciences de la Vie",
      icon: "🔬",
      description: "Structure et fonction de la cellule",
      color: "emerald"
    }
  ],

  // ========== QUIZZES ==========
  quizzes: [
    {
      id: 1,
      title: "Introduction à la Programmation Python",
      description: "Maîtrisez les bases de la programmation en Python : variables, structures de contrôle, fonctions et POO.",
      subjectId: 1,
      universityId: 1,
      facultyId: 1,
      level: "S1",
      authorId: 3,
      questionsCount: 20,
      duration: 30,
      difficulty: "beginner",
      isPro: false,
      isPublished: true,
      isFeatured: true,
      attempts: 1250,
      avgScore: 72.5,
      successRate: 68,
      rating: 4.3,
      ratingCount: 245,
      createdAt: "2024-01-10T09:00:00Z",
      updatedAt: "2024-01-15T14:20:00Z",
      tags: ["Python", "Débutant", "Algorithmique"],
      learningObjectives: [
        "Comprendre les types de données",
        "Maîtriser les structures conditionnelles",
        "Implémenter des fonctions",
        "Introduction à la POO"
      ]
    },
    {
      id: 2,
      title: "Machine Learning Avancé - Deep Learning",
      description: "Architectures avancées de deep learning : CNN, RNN, Transformers et applications en NLP.",
      subjectId: 1,
      universityId: 2,
      facultyId: 3,
      level: "Master",
      authorId: 3,
      questionsCount: 35,
      duration: 75,
      difficulty: "expert",
      isPro: true,
      isPublished: true,
      isFeatured: true,
      attempts: 842,
      avgScore: 58.2,
      successRate: 42,
      rating: 4.8,
      ratingCount: 124,
      createdAt: "2024-01-12T11:30:00Z",
      updatedAt: "2024-01-18T16:45:00Z",
      tags: ["Deep Learning", "PyTorch", "Computer Vision", "NLP"],
      learningObjectives: [
        "Maîtriser les architectures CNN",
        "Implémenter des modèles Transformer",
        "Optimiser les hyperparamètres",
        "Déployer des modèles en production"
      ]
    },
    {
      id: 3,
      title: "Algèbre Linéaire - Espaces Vectoriels",
      description: "Concepts fondamentaux des espaces vectoriels, applications linéaires et diagonalisation.",
      subjectId: 2,
      universityId: 1,
      facultyId: 2,
      level: "S2",
      authorId: 3,
      questionsCount: 25,
      duration: 45,
      difficulty: "intermediate",
      isPro: false,
      isPublished: true,
      isFeatured: false,
      attempts: 890,
      avgScore: 65.8,
      successRate: 55,
      rating: 4.1,
      ratingCount: 178,
      createdAt: "2024-01-08T10:15:00Z",
      updatedAt: "2024-01-16T09:30:00Z",
      tags: ["Algèbre", "Matrices", "Espaces Vectoriels"],
      learningObjectives: [
        "Comprendre les espaces vectoriels",
        "Maîtriser les applications linéaires",
        "Diagonaliser des matrices",
        "Résoudre des systèmes linéaires"
      ]
    }
  ],

  // ========== QUESTIONS ==========
  questions: [
    {
      id: 1,
      quizId: 1,
      type: "multiple_choice",
      question: "Quel mot-clé est utilisé pour définir une fonction en Python ?",
      options: [
        "function",
        "def", 
        "define",
        "func"
      ],
      correctAnswer: 1, // Index de la bonne réponse
      explanation: "Le mot-clé 'def' est utilisé pour définir une fonction en Python.",
      difficulty: "easy",
      points: 1,
      timeLimit: 60,
      hasImage: false,
      imageUrl: null,
      tags: ["Fonctions", "Syntaxe"]
    },
    {
      id: 2,
      quizId: 1,
      type: "multiple_choice",
      question: "Quelle est la sortie de : print(3 * 'a') ?",
      options: [
        "aaa",
        "3a",
        "a3",
        "Erreur"
      ],
      correctAnswer: 0,
      explanation: "En Python, multiplier une chaîne par un entier répète la chaîne.",
      difficulty: "easy",
      points: 1,
      timeLimit: 60,
      hasImage: false,
      imageUrl: null,
      tags: ["Opérations", "Strings"]
    },
    {
      id: 3,
      quizId: 2,
      type: "multiple_choice",
      question: "Quelle architecture est la plus adaptée pour le traitement du langage naturel ?",
      options: [
        "CNN",
        "RNN",
        "Transformer",
        "GAN"
      ],
      correctAnswer: 2,
      explanation: "Les modèles Transformer sont particulièrement efficaces pour le NLP.",
      difficulty: "hard",
      points: 3,
      timeLimit: 90,
      hasImage: false,
      imageUrl: null,
      tags: ["NLP", "Architectures"]
    }
  ],

  // ========== TENTATIVES DE QUIZ ==========
  quizAttempts: [
    {
      id: 1,
      userId: 2,
      quizId: 1,
      score: 85,
      correctAnswers: 17,
      totalQuestions: 20,
      timeSpent: 1425, // en secondes
      completedAt: "2024-01-20T15:30:00Z",
      status: "completed",
      answers: [
        { questionId: 1, selectedAnswer: 1, isCorrect: true, timeSpent: 45 },
        { questionId: 2, selectedAnswer: 0, isCorrect: true, timeSpent: 30 }
      ]
    },
    {
      id: 2,
      userId: 2,
      quizId: 1,
      score: 90,
      correctAnswers: 18,
      totalQuestions: 20,
      timeSpent: 1560,
      completedAt: "2024-01-21T10:15:00Z",
      status: "completed",
      answers: [
        { questionId: 1, selectedAnswer: 1, isCorrect: true, timeSpent: 40 },
        { questionId: 2, selectedAnswer: 0, isCorrect: true, timeSpent: 35 }
      ]
    }
  ],

  // ========== CLASSEMENT ==========
  leaderboard: [
    {
      id: 1,
      userId: 2,
      quizId: 1,
      score: 90,
      rank: 1,
      timeSpent: 1560,
      completedAt: "2024-01-21T10:15:00Z"
    },
    {
      id: 2,
      userId: 1,
      quizId: 1,
      score: 88,
      rank: 2,
      timeSpent: 1620,
      completedAt: "2024-01-20T16:20:00Z"
    }
  ],

  // ========== PROGRÈS UTILISATEUR ==========
  userProgress: [
    {
      id: 1,
      userId: 2,
      subjectId: 1,
      quizzesCompleted: 5,
      totalScore: 425,
      averageScore: 85,
      timeSpent: 12500, // secondes
      level: "advanced",
      badges: ["python_expert", "quick_learner"],
      lastActivity: "2024-01-21T10:15:00Z"
    }
  ],

  // ========== BADGES ==========
  badges: [
    {
      id: 1,
      name: "Débutant en Python",
      description: "Complétez votre premier quiz Python",
      icon: "🐍",
      color: "green",
      criteria: { quizzesCompleted: 1, subject: "Python" }
    },
    {
      id: 2,
      name: "Expert en Algorithmique",
      description: "Score > 90% dans 5 quizzes d'algorithmique",
      icon: "💡",
      color: "gold",
      criteria: { minScore: 90, quizzesCount: 5, subject: "Algorithmique" }
    }
  ],

  // ========== USER BADGES ==========
  userBadges: [
    {
      id: 1,
      userId: 2,
      badgeId: 1,
      earnedAt: "2024-01-15T14:30:00Z"
    }
  ],

  // ========== ABONNEMENTS ==========
  subscriptions: [
    {
      id: 1,
      userId: 1,
      plan: "premium",
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      status: "active",
      paymentMethod: "credit_card"
    }
  ],

  // ========== NOTIFICATIONS ==========
  notifications: [
    {
      id: 1,
      userId: 2,
      type: "quiz_completed",
      title: "Quiz Terminé !",
      message: "Vous avez terminé le quiz 'Introduction à Python' avec un score de 85%",
      isRead: false,
      createdAt: "2024-01-20T15:30:00Z",
      data: { quizId: 1, score: 85 }
    }
  ]
};

// ========== FONCTIONS D'ACCÈS AUX DONNÉES ==========

export const DatabaseAPI = {
  // Users
  getUserById: (id) => Database.users.find(user => user.id === id),
  getUserByEmail: (email) => Database.users.find(user => user.email === email),
  
  // Quizzes
  getQuizzes: (filters = {}) => {
    let quizzes = Database.quizzes;
    
    if (filters.universityId) {
      quizzes = quizzes.filter(q => q.universityId === filters.universityId);
    }
    
    if (filters.subjectId) {
      quizzes = quizzes.filter(q => q.subjectId === filters.subjectId);
    }
    
    if (filters.difficulty) {
      quizzes = quizzes.filter(q => q.difficulty === filters.difficulty);
    }
    
    if (filters.level) {
      quizzes = quizzes.filter(q => q.level === filters.level);
    }
    
    if (filters.isPro !== undefined) {
      quizzes = quizzes.filter(q => q.isPro === filters.isPro);
    }
    
    return quizzes;
  },
  
  getQuizById: (id) => {
    const quiz = Database.quizzes.find(q => q.id === id);
    if (!quiz) return null;
    
    // Enrichir avec les données liées
    const subject = Database.subjects.find(s => s.id === quiz.subjectId);
    const university = Database.universities.find(u => u.id === quiz.universityId);
    const faculty = Database.faculties.find(f => f.id === quiz.facultyId);
    const author = Database.users.find(u => u.id === quiz.authorId);
    const questions = Database.questions.filter(q => q.quizId === id);
    
    return {
      ...quiz,
      subject,
      university,
      faculty,
      author,
      questions
    };
  },
  
  // Questions
  getQuestionsByQuizId: (quizId) => 
    Database.questions.filter(q => q.quizId === quizId),
  
  // User Progress
  getUserProgress: (userId) => 
    Database.userProgress.find(up => up.userId === userId),
  
  // Leaderboard
  getQuizLeaderboard: (quizId, limit = 10) => 
    Database.leaderboard
      .filter(lb => lb.quizId === quizId)
      .sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent)
      .slice(0, limit)
      .map(entry => ({
        ...entry,
        user: Database.users.find(u => u.id === entry.userId)
      })),
  
  // User Attempts
  getUserAttempts: (userId, quizId = null) => {
    let attempts = Database.quizAttempts.filter(a => a.userId === userId);
    
    if (quizId) {
      attempts = attempts.filter(a => a.quizId === quizId);
    }
    
    return attempts.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  },
  
  // Statistics
  getQuizStatistics: (quizId) => {
    const attempts = Database.quizAttempts.filter(a => a.quizId === quizId);
    const totalAttempts = attempts.length;
    const avgScore = attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts;
    
    return {
      totalAttempts,
      avgScore: Math.round(avgScore * 10) / 10,
      completionRate: Math.round((attempts.filter(a => a.status === 'completed').length / totalAttempts) * 100),
      timeSpentAvg: Math.round(attempts.reduce((sum, a) => sum + a.timeSpent, 0) / totalAttempts / 60) // en minutes
    };
  },
  
  // Search
  searchQuizzes: (query) => {
    const searchTerm = query.toLowerCase();
    return Database.quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(searchTerm) ||
      quiz.description.toLowerCase().includes(searchTerm) ||
      quiz.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
};

export default Database;