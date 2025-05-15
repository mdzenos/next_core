import serverApiClient from '@/services/serverApiClient';

export const authRegisterService = {
  async fetchData(params?: any) {
    try {
      const response = await serverApiClient.get('/auth-register', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching authRegister:', error);
      throw error;
    }
  },

  // TODO: Add more API methods here
};
