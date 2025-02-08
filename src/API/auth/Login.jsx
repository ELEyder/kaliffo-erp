import { apiClient } from '../apiClient';

/**
 * Realiza la autenticación del usuario enviando los datos de login al servidor.
 * URL de ejemplo: http://localhost:3000/usuario/login
 */
export const loginApi = async (values) => {
  try {
    const response = await apiClient.post("/usuario/login", values); // Realizar petición POST al servidor con los datos de login

    return {
      ok: true,
      userData: response.data, // Devolver los datos del usuario en caso de éxito
    };
  } catch (error) {
    return {
      ok: false,
      userData: {}, // Devolver un objeto vacío en caso de error
    };
  }
};
