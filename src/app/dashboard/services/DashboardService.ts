import serverApiClient from '@/services/serverApiClient';

export const dashboardService = {
  async fetchData(params?: any) {
    try {
      const response = await serverApiClient.get('/dashboard', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      throw error;
    }
  },

  // TODO: Add more API methods here
};
