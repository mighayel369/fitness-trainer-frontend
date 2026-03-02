import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";

export const adminUserService = {
  fetchUsers: async (page: number, search: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.USERS.BASE, {
      params: { pageNO: page, search }
    });
    return data;
  },
  updateUserStatus: async (id: string, newStatus: boolean) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.ADMIN.USERS.STATUS_BY_ID(id), { status: newStatus });
    return data;
  },
  fetchUserById: async (id: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.USERS.BY_ID(id));
    return data;
  }
};