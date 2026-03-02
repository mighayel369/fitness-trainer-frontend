import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";
export const adminServiceManagement = {
  fetchServices: async (page: number, search: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.SERVICES.BASE, {
      params: { pageNO: page, search }
    });
    return data;
  },
  updateServiceStatus: async (id: string, newStatus: boolean) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.ADMIN.SERVICES.STATUS_BY_ID(id), { status: newStatus });
    console.log(data)
    return data;
  },
  createNewService: async (formData: any) => {
    console.log(formData)
    const { data } = await axiosInstance.post(API_ENDPOINTS.ADMIN.SERVICES.ADD, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
  getServiceById: async (id: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.SERVICES.BY_ID(id));
    return data;
  },
  deleteServiceById: async (id: string) => {
    const { data } = await axiosInstance.delete(API_ENDPOINTS.ADMIN.SERVICES.BY_ID(id));
    return data;
  },
  updateService: async (id: string, payload: any) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.ADMIN.SERVICES.BY_ID(id), payload);
    return data;
  }
};