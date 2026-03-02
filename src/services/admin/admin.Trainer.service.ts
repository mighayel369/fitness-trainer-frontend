import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";


export const adminTrainerService = {
  fetchTrainers: async (page: number, search: string, filters?: any) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.TRAINERS.BASE, {
      params: { pageNO: page, search, ...filters },
    });
    return data;
  },
  updateTrainerStatus: async (trainerId: string, newStatus: boolean) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.ADMIN.TRAINERS.STATUS_BY_ID(trainerId), { status: newStatus });
    return data;
  },
  fetchTrainerById: async (id: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.TRAINERS.BY_ID(id));
    return data;
  },
  updateVerification: async (id: string, selectedAction: string, reason?: string) => {
    const {data}= await axiosInstance.patch(API_ENDPOINTS.ADMIN.TRAINERS.VERIFY_ACTION(id), { action: selectedAction, reason });
    return data
  },
    fetchPendingTrainers: async (page: number, search: string, filters?: any) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.TRAINERS.PENDING, {
      params: { pageNO: page, search, ...filters },
    });
    return data;
  },
};