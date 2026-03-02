import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";


export const adminAuthService = {
  loginAdmin: async (email: string, password: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.ADMIN.LOGIN, { email, password });
    return data;
  },
    clearRefreshToken: async () => {
      const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
      return data;
    }
};





