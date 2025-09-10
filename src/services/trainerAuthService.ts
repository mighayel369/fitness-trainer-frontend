import axiosInstance from "../api/AxiosInstance";

export const trainerAuthService = {
  loginTrainer: async (email: string, password: string) => {
    const response = await axiosInstance.post('trainer/login', { email, password }, { withCredentials: true });
    return response.data;
  }
}