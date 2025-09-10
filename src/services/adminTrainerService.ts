import axiosInstance from "../api/AxiosInstance";

export const adminTrainerService = {
  fetchTrainers: async (page: number, search: string) => {
    const response = await axiosInstance.get(
      `admin/trainers?pageNO=${page}&search=${search}`,
      { withCredentials: true }
    );
    return response.data;
  },

  updateTrainerStatus: async (trainerId: string, newStatus: boolean) => {
    const response = await axiosInstance.patch(
      `admin/users/status/${trainerId}`,
      { status: newStatus },
      { withCredentials: true }
    );
    return response.data;
  },
   fetchTrainerById: async (id: string) => {
    const response = await axiosInstance.get(`admin/trainers/${id}`, {
      withCredentials: true,
    });
    return response.data;
  },

  fetchPendingTrainers:async()=>{
    const response=await axiosInstance.get('admin/pending-trainers',{withCredentials:true})
    return response.data
  } ,

  findSingleTrainer:async(id:string|undefined)=>{
    const response = await axiosInstance.get(`admin/verify-trainer/${id}`);
    return response.data
  },

  updateVerification:async(id:string,selectedAction:string,reason?:string)=>{
    const response=await axiosInstance.patch(`admin/verify-trainer-action/${id}`, {action: selectedAction,reason}, { withCredentials: true });
    return response
  }
}