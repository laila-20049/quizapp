import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Building, 
  MapPin, 
  Users, 
  Star,
  ChevronDown,
  Grid,
  List,
  BookOpen,
  GraduationCap
} from 'lucide-react';

const Faculties = ({ 
  onFacultySelect,
  selectedUniversity = null,
  showFilters = true,
  mode = 'select' // 'select' or 'browse'
}) => {
  const [faculties, setFaculties] = useState([]);
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // Données des facultés marocaines
  const facultiesData = [
    {
      id: 1,
      name: "Faculté des Sciences",
      acronym: "FS",
      university: "Université Hassan II",
      universityId: 1,
      city: "Casablanca",
      type: "Sciences",
      students: 8500,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
      description: "Faculté des Sciences offrant des formations en mathématiques, physique, chimie et biologie.",
      departments: ["Mathématiques", "Physique", "Chimie", "Biologie", "Géologie"],
      established: 1975,
      website: "https://www.fs.uh2.ac.ma"
    },
    {
      id: 2,
      name: "Faculté des Sciences et Techniques",
      acronym: "FST",
      university: "Université Hassan II",
      universityId: 1,
      city: "Mohammedia",
      type: "Sciences et Techniques",
      students: 6200,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400",
      description: "FST spécialisée dans les sciences appliquées et le génie.",
      departments: ["Génie Civil", "Génie Informatique", "Génie Mécanique", "Génie Électrique"],
      established: 1986,
      website: "https://www.fstm.ac.ma"
    },
    {
      id: 3,
      name: "École Nationale des Sciences Appliquées",
      acronym: "ENSA",
      university: "Université Mohammed V",
      universityId: 2,
      city: "Rabat",
      type: "École d'Ingénieurs",
      students: 3200,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400",
      description: "École d'ingénieurs formant des experts en technologies avancées.",
      departments: ["Informatique", "Réseaux", "Data Science", "Cybersécurité"],
      established: 1998,
      website: "https://www.ensar.ac.ma"
    },
    {
      id: 4,
      name: "Faculté de Médecine et de Pharmacie",
      acronym: "FMP",
      university: "Université Cadi Ayyad",
      universityId: 3,
      city: "Marrakech",
      type: "Médecine",
      students: 4500,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400",
      description: "Formation médicale et pharmaceutique d'excellence.",
      departments: ["Médecine", "Pharmacie", "Chirurgie Dentaire"],
      established: 1984,
      website: "https://www.fmp.uca.ma"
    },
    {
      id: 5,
      name: "Faculté des Sciences Juridiques, Économiques et Sociales",
      acronym: "FSJES",
      university: "Université Mohammed V",
      universityId: 2,
      city: "Rabat",
      type: "Sciences Sociales",
      students: 12500,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
      description: "Faculté de droit, économie et sciences sociales.",
      departments: ["Droit", "Économie", "Gestion", "Sociologie"],
      established: 1962,
      website: "https://www.fsjesr.ac.ma"
    },
    {
      id: 6,
      name: "École Supérieure de Technologie",
      acronym: "EST",
      university: "Université Ibn Tofail",
      universityId: 4,
      city: "Kénitra",
      type: "Technologie",
      students: 2800,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      description: "Formation technologique et professionnelle de haut niveau.",
      departments: ["Génie des Procédés", "Maintenance Industrielle", "Logistique"],
      established: 1992,
      website: "https://www.est-uit.ac.ma"
    },
    {
      id: 7,
      name: "Faculté des Lettres et des Sciences Humaines",
      acronym: "FLSH",
      university: "Université Abdelmalek Essaâdi",
      universityId: 5,
      city: "Tétouan",
      type: "Lettres",
      students: 6800,
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      description: "Faculté des humanités et sciences sociales.",
      departments: ["Littérature", "Histoire", "Philosophie", "Langues"],
      established: 1989,
      website: "https://www.flsh.ae.ma"
    },
    {
      id: 8,
      name: "Faculté des Sciences de l'Éducation",
      acronym: "FSE",
      university: "Université Hassan II",
      universityId: 1,
      city: "Casablanca",
      type: "Éducation",
      students: 3200,
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      description: "Formation des enseignants et chercheurs en sciences de l'éducation.",
      departments: ["Pédagogie", "Psychologie", "Didactique"],
      established: 1995,
      website: "https://www.fse.uh2.ac.ma"
    }
  ];

  // Types de facultés
  const facultyTypes = [
    { id: 'all', name: 'Toutes les facultés' },
    { id: 'Sciences', name: 'Sciences Fondamentales' },
    { id: 'Sciences et Techniques', name: 'Sciences et Techniques' },
    { id: 'École d\'Ingénieurs', name: 'Écoles d\'Ingénieurs' },
    { id: 'Médecine', name: 'Médecine et Santé' },
    { id: 'Sciences Sociales', name: 'Sciences Sociales' },
    { id: 'Technologie', name: 'Technologie' },
    { id: 'Lettres', name: 'Lettres et Humanités' },
    { id: 'Éducation', name: 'Éducation' }
  ];

  useEffect(() => {
    // Simulation de chargement
    const loadFaculties = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filtered = facultiesData;
      
      // Filtrer par université si sélectionnée
      if (selectedUniversity) {
        filtered = filtered.filter(f => f.universityId === selectedUniversity.id);
      }
      
      setFaculties(filtered);
      setFilteredFaculties(filtered);
      setLoading(false);
    };

    loadFaculties();
  }, [selectedUniversity]);

  useEffect(() => {
    let filtered = faculties;
    
    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(query) ||
        f.acronym.toLowerCase().includes(query) ||
        f.university.toLowerCase().includes(query) ||
        f.city.toLowerCase().includes(query)
      );
    }
    
    // Filtre par type
    if (selectedType !== 'all') {
      filtered = filtered.filter(f => f.type === selectedType);
    }
    
    setFilteredFaculties(filtered);
  }, [searchQuery, selectedType, faculties]);

  const handleFacultySelect = (faculty) => {
    setSelectedFaculty(faculty);
    onFacultySelect?.(faculty);
  };

  const FacultyCard = ({ faculty }) => (
    <div 
      className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg cursor-pointer ${
        selectedFaculty?.id === faculty.id 
          ? 'border-blue-500 ring-2 ring-blue-200' 
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => handleFacultySelect(faculty)}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 rounded-t-xl overflow-hidden">
        <img 
          src={faculty.image} 
          alt={faculty.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {faculty.acronym}
        </div>
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 text-gray-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          {faculty.rating}
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {faculty.name}
        </h3>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{faculty.university}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-green-500" />
            <span>{faculty.city}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-purple-500" />
            <span>{faculty.students.toLocaleString()} étudiants</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {faculty.description}
        </p>

        {/* Départements */}
        <div className="flex flex-wrap gap-1 mb-4">
          {faculty.departments.slice(0, 3).map((dept, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            >
              {dept}
            </span>
          ))}
          {faculty.departments.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
              +{faculty.departments.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Fondée en {faculty.established}</span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {faculty.departments.length} départements
          </span>
        </div>
      </div>
    </div>
  );

  const FacultyListItem = ({ faculty }) => (
    <div 
      className={`bg-white rounded-lg border-2 p-4 transition-all duration-300 hover:shadow-md cursor-pointer ${
        selectedFaculty?.id === faculty.id 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => handleFacultySelect(faculty)}
    >
      <div className="flex items-start gap-4">
        {/* Logo/Acronyme */}
        <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
          {faculty.acronym}
        </div>
        
        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {faculty.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>{faculty.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>{faculty.university}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{faculty.city}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{faculty.students.toLocaleString()} étudiants</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            {faculty.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {faculty.departments.slice(0, 4).map((dept, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {dept}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedUniversity ? `Facultés de ${selectedUniversity.name}` : 'Toutes les Facultés'}
          </h2>
          <p className="text-gray-600">
            {filteredFaculties.length} faculté{filteredFaculties.length !== 1 ? 's' : ''} disponible{filteredFaculties.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {mode === 'browse' && (
          <div className="flex items-center gap-3">
            {/* Sélecteur de vue */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filtres et recherche */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une faculté..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtre par type */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {facultyTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Statistiques */}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4 text-blue-500" />
                <span>{facultiesData.length} facultés</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-green-500" />
                <span>{facultiesData.reduce((sum, f) => sum + f.students, 0).toLocaleString()} étudiants</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Liste des facultés */}
      {filteredFaculties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucune faculté trouvée
          </h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {filteredFaculties.map(faculty => 
            viewMode === 'grid' 
              ? <FacultyCard key={faculty.id} faculty={faculty} />
              : <FacultyListItem key={faculty.id} faculty={faculty} />
          )}
        </div>
      )}

      {/* Faculté sélectionnée (pour le mode select) */}
      {mode === 'select' && selectedFaculty && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">
                Faculté sélectionnée
              </h3>
              <p className="text-blue-700">
                {selectedFaculty.name} - {selectedFaculty.university}
              </p>
            </div>
            <button
              onClick={() => handleFacultySelect(null)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Changer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculties;