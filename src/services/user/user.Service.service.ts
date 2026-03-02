import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";
export const userServices={
fetchServices: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.USER.GET_SERVICES);
    return data;
  },
}