import axiosInstance from "../api/AxiosInstance";
import { API_ENDPOINTS } from "../api/endPoints";

export const TrainerService={
  ExploreTrainers: async (page: number, search: string, filters?: any) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.TRAINER.EXPLORE, {
      params: { pageNO: page, search, ...filters },
    });
    return data;
  },
   ExploreTrainerDetails:async(id:string)=>{
    const {data}=await axiosInstance.get(API_ENDPOINTS.TRAINER.DETAILS(id))
    return data
  },
  UpdateProfile: async (formData: FormData) => {
    const { data } = await axiosInstance.put(API_ENDPOINTS.TRAINER.UPDATE_PROFILE, formData,{
      headers:{'Content-Type':'multipart/form-data'}
    });
    return data;
  },
  UpdateProfilePic: async (formData: FormData) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.TRAINER.UPDATE_AVATAR, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },
   FullProfile: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.TRAINER.GET_FULL_PROFILE);
    return data;
  },

  GetVerifiedTrainers: async (page: number, search: string, filters?: any) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.TRAINER.LIST_VERIFIED, {
      params: { pageNO: page, search, ...filters },
    });
    return data;
  },
  BlockUnblockTrainer: async (trainerId: string, newStatus: boolean) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.TRAINER.UPDATE_STATUS(trainerId), { status: newStatus });
    return data;
  },
  GetTrainerDetails: async (id: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.TRAINER.GET_DETAILS(id));
    return data;
  },
  HandleTrainerApproval: async (id: string, selectedAction: string, reason?: string) => {
    const {data}= await axiosInstance.patch(API_ENDPOINTS.TRAINER.HANDLE_APPROVAL(id), { action: selectedAction, reason });
    return data
  },
   GetPendingTrainers: async (page: number, search: string, filters?: any) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.TRAINER.LIST_PENDING, {
      params: { pageNO: page, search, ...filters },
    });
    return data;
  },

}