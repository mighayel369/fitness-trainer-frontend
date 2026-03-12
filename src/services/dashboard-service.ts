import axiosInstance from "../api/AxiosInstance";
import { API_ENDPOINTS } from "../api/endPoints";

export const DashboardService={
 AdminDashboardInsights: async () => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.ADMIN_INSIGHTS);
        return data
},
TrainerDashboardMetrics: async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.TRAINER_METRICS);
  console.log(data)
  return data; 
},

getTrainerDailyAgenda: async (date: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.TRAINER_AGENDA, {
      params: { date }
    });
    console.log(data)
    return data
  }
}