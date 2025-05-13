//import axios from 'axios';
// import { useGetComunicadosQuery, useGetComunicadoByIdQuery } from './api/comunicadosApi';

// Datos de ejemplo para usar mientras la API no está disponible
const MOCK_DATA = [
  {
    titulo: 'Comunicado Importante',
    descripcion: 'Información relevante para todos los participantes de las olimpiadas.',
    imagen1: '/assets/comunicado1.jpg',
    imagen2: '/assets/portada1.jpg'
  },
  {
    titulo: 'Comunicado Importante',
    descripcion: 'Información relevante para todos los participantes de las olimpiadas.',
    imagen1: '/assets/comunicado1.jpg',
    imagen2: '/assets/portada1.jpg'
  },
  {
    titulo: 'Comunicado Importante',
    descripcion: 'Información relevante para todos los participantes de las olimpiadas.',
    imagen1: '/assets/comunicado1.jpg',
    imagen2: '/assets/portada1.jpg'
  },
  {
    titulo: 'Comunicado Nuevo',
    descripcion: 'Nuevas fechas para las inscripciones de las olimpiadas.',
    imagen1: '/assets/comunicado1.jpg',
    imagen2: '/assets/portada1.jpg'
  },
  {
    titulo: 'Aviso Especial',
    descripcion: 'Cambios en el cronograma de actividades para el próximo mes.',
    imagen1: '/assets/comunicado1.jpg',
    imagen2: '/assets/portada1.jpg'
  }
];

// Clase para manejar las operaciones relacionadas con comunicados
class ComunicadosService {
  // Método para obtener todos los comunicados
  static async getComunicados() {
    try {
      // En un entorno real, esto haría una llamada a la API
      // const response = await axios.get('/api/comunicados');
      // return response.data;
      
      // Por ahora, devolvemos datos de ejemplo
      return MOCK_DATA;
    } catch (error) {
      console.error('Error al obtener comunicados:', error);
      return [];
    }
  }

  // Método para obtener un comunicado específico por ID
  static async getComunicadoById(id) {
    try {
      // En un entorno real, esto haría una llamada a la API
      // const response = await axios.get(`/api/comunicados/${id}`);
      // return response.data;
      
      // Por ahora, simulamos la búsqueda
      return MOCK_DATA[id] || null;
    } catch (error) {
      console.error(`Error al obtener comunicado con ID ${id}:`, error);
      return null;
    }
  }

  /* 
  // Hooks para usar con RTK Query - Comentados hasta que se implemente RTK Query
  static useComunicados() {
    const { data = MOCK_DATA, isLoading, error } = useGetComunicadosQuery(undefined, {
      // Si la API falla, usar los datos de ejemplo
      skip: false,
      selectFromResult: (result) => ({
        ...result,
        data: result.data || MOCK_DATA,
      }),
    });

    return { comunicados: data, isLoading, error };
  }

  static useComunicadoById(id) {
    const { data, isLoading, error } = useGetComunicadoByIdQuery(id, {
      // Si la API falla, usar los datos de ejemplo
      skip: false,
      selectFromResult: (result) => ({
        ...result,
        data: result.data || MOCK_DATA[id] || null,
      }),
    });

    return { comunicado: data, isLoading, error };
  }
  */
}

export default ComunicadosService;