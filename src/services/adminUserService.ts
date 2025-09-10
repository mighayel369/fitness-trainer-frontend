import axiosInstance from "../api/AxiosInstance";

export const adminUserService = {
  fetchUsers: async (page: number, search: string) => {
    const response = await axiosInstance.get(
      `admin/users?pageNO=${page}&search=${search}`,
      { withCredentials: true }
    );
    return response.data;
  },

  updateUserStatus: async (userId: string, newStatus: boolean) => {
    const response = await axiosInstance.patch(
      `admin/users/status/${userId}`,
      { status: newStatus },
      { withCredentials: true }
    );
    return response.data;
  },
     fetchUserById: async (id: string) => {
      const response = await axiosInstance.get(`admin/users/${id}`, {
        withCredentials: true,
      });
      return response.data;
    }
};