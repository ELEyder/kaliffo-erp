import apiClient from '../apiClient';

export const loginApi = async (values) => {
  try {
    const response = await apiClient.post("/usuario/login", values);

    return {
      ok: true,
      userData: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      userData: {},
    };
  }
};
