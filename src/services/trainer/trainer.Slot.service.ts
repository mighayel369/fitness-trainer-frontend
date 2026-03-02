import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";

export const trainerSlotService = {
  getTrainerSlots: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.TRAINER.SLOTS);
    return data;
  },
  updateWeeklySlots: async (weeklyAvailability: any) => {
    await axiosInstance.put(API_ENDPOINTS.TRAINER.UPDATE_WEEKLY_SLOTS, { weeklyAvailability });
  },
};
