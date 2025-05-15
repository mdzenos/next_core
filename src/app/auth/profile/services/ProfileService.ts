import serverApiClient from '@/services/serverApiClient';

export const authProfileService = {
  async fetchData(params?: any) {
    try {
      const response = await serverApiClient.get('/auth-profile', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching authProfile:', error);
      throw error;
    }
  },

  // TODO: Add more API methods here
};
