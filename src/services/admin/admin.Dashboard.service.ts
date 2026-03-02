import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";

export const adminDashboardService = {
  getDashboardInfo: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.DASHBOARD);
    return data
  },
};
