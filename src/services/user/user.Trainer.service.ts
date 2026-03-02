import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";

export const userTrainerService={
  fetchTrainers: async (page: number, search: string, filters?: any) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.USER.LIST_TRAINERS, {
      params: { pageNO: page, search, ...filters },
    });
    return data;
  },
  fetchTrainerSlot: async (date: Date, trainerId: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.USER.TRAINER_SLOTS, { date, trainerId });
    return data;
  },
  fetchTrainerProfile:async(id:string)=>{
    const {data}=await axiosInstance.get(API_ENDPOINTS.USER.FETCH_TRAINER(id))
    return data
  }
}