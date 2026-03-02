import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";

export const trainerDashboardService = {
  getTrainerDashboard: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.TRAINER.TRAINER_DASHBOARD);
    return data.result;
  },

  getTrainerDashboardAppointment: async (date: string) => {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.TRAINER.TRAINER_DASHBOARD_APPOINMENT}?date=${date}`
    );
    return data.result.upcomingAppointments; 
  }
};