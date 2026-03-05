import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";

export const userTrainerService={

  fetchTrainerSlot: async (date: Date, trainerId: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.USER.TRAINER_SLOTS, { date, trainerId });
    return data;
  }
}