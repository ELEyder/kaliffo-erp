import axios from 'axios';

// Función para crear una instancia de Axios con configuración personalizada
const createApiClient = (contentType = 'application/json') => {
  const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // URL base de la API
    headers: {
      'Content-Type': contentType, // Tipo de contenido dinámico
    },
    withCredentials: true, // Habilita el envío de cookies en solicitudes CORS
  });

  // Interceptor para agregar el token de autenticación
  apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Obtener el token desde localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agregar el token al encabezado
    }
    return config;
  });

  return apiClient;
};

// Exportación de instancias para uso específico
export const apiClient = createApiClient(); // Para JSON
export const apiClientFiles = createApiClient('multipart/form-data'); // Para archivos
