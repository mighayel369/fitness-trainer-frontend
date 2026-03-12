import axiosInstance from "../api/AxiosInstance";
import { API_ENDPOINTS } from "../api/endPoints";

export const SlotService={
 TrainerSchedules: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.SLOT.TRAINER_SCHEDULE);
    return data;
  },
  ModifyTrainerSchedules: async (weeklyAvailability: any) => {
    const {data}=await axiosInstance.put(API_ENDPOINTS.SLOT.MODIFY_WEEKLY_SCHEDULE, { weeklyAvailability });
    return data
  },
  AvailableBookingSlots: async (date: Date, trainerId: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.SLOT.AVAILABLE_BOOKING_SLOTS, { date, trainerId });
    return data;
  }
}