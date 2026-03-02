import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";

export const trainerAuthService = {
  loginTrainer: async (email: string, password: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.TRAINER.LOGIN, { email, password });
    return data;
  },
  verifyTrainerAccessToken: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.TRAINER.VERIFY_TOKEN);
    return data;
  },
      createTrainer: async (formData: FormData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.TRAINER.CREATE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  reapplyTrainer: async (formData: FormData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.TRAINER.REAPPLY, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
},
  clearRefreshToken: async () => {
      const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
      return data;
    }
};

