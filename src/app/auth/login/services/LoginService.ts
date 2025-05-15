import serverApiClient from '@/services/serverApiClient';

export const authLoginService = {
  async fetchData(params?: any) {
    try {
      const response = await serverApiClient.get('/auth-login', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching authLogin:', error);
      throw error;
    }
  },

  // TODO: Add more API methods here
};
