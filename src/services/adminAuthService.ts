import axiosInstance from "../api/AxiosInstance";

export const adminAuthService = {
  loginAdmin: async (email: string, password: string) => {
    const response = await axiosInstance.post('/admin/login', { email, password }, { withCredentials: true });
    console.log(response)
    return response.data;
  }
};