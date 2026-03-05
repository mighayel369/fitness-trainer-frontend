import axiosInstance from "../api/AxiosInstance";
import { API_ENDPOINTS } from "../api/endPoints";
import { type UpdateUserProfileDTO } from "../../src/types/userType";
export const UserService={
  FetchUsers: async (page: number, search: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.USER.GET_ALL, {
      params: { pageNO: page, search }
    });
    return data;
  },
  UpdateUserStatus: async (id: string, newStatus: boolean) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_STATUS(id), { status: newStatus });
    return data;
  },
  GetUserDetails: async (id: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.USER.GET_DETAILS(id));
    return data;
  },
  UpdateProfile: async (formData: UpdateUserProfileDTO) => {
      const { data } = await axiosInstance.put(API_ENDPOINTS.USER.UPDATE_PROFILE, formData);
      return data;
  },
  GetFullProfile: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.USER.GET_FULL_PROFILE);
    return data;
  },
  UpdateProfilePicture: async (formData: FormData) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_PROFILE_IMAGE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  }

}