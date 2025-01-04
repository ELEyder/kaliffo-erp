import axios from 'axios';

// Se crea una instancia de axios con configuraciones predeterminadas
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // URL base de la API
  timeout: 5000, // Tiempo de espera para la solicitud
  headers: {
    'Content-Type': 'application/json', // Tipo de contenido de la solicitud
  },
  withCredentials: true, // Habilita el envío de cookies en solicitudes CORS
});

// Se agrega un interceptor para modificar las solicitudes antes de que se envíen
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Se obtiene el token desde localStorage
  if (token) {
    // Si hay un token, se agrega al encabezado Authorization
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; // Devuelve la configuración modificada
});

export default apiClient; // Exporta la instancia para su uso en otras partes de la aplicación
