import axios from "axios";

// Función para crear una instancia de Axios con configuración personalizada
const createApiClient = (contentType = "application/json", type = "json") => {
  const ApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // URL base de la API
    headers: {
      "Content-Type": contentType, // Tipo de contenido dinámico
    },
    responseType: type,
    withCredentials: true, // Habilita el envío de cookies en solicitudes CORS
  });

  // Interceptor para agregar el token de autenticación
  ApiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Obtener el token desde localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agregar el token al encabezado
    }
    return config;
  });

  return ApiClient;
};

// Exportación de instancias para uso específico
export const ApiClient = createApiClient(); // Para JSON
export const ApiClientFiles = createApiClient("multipart/form-data", "blob"); // Para archivos
