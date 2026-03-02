import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";

export const trainerProfileService={
updateTrainerProfile: async (formData: FormData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.TRAINER.UPDATE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  updateTrainerProfilePic: async (formData: FormData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.TRAINER.UPDATE_PIC, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },
  getTrainerDetails: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.TRAINER.GET_DETAILS);
    return data;
  }
}