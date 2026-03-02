import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";
export const userAuthService = {
  login: async (email: string, password: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.USER.LOGIN, { email, password });
    console.log(data)
    return data;
  },
  googleLogin: () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  },
  signup: async (name: string, email: string, password: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.USER.SIGNUP, { name, email, password });
    return data
  },
  otpsent: async (email: string | null, role: string | null) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.SEND_OTP, { email, role });
    return data;
  },
  sendForgotPasswordLink: async (email: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return data;
  },
  resetPassword: async (token: string, password: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD(token), { password });
    return data;
  },
  clearRefreshToken: async () => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    return data;
  },
  verifyAccessToken: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.AUTH.VERIFY_USER_TOKEN);
    return data;
  },
};