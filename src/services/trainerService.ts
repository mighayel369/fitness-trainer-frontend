import axiosInstance from "../api/AxiosInstance";

export const trainerService = {
  createTrainer: async (formData: FormData) => {
    const response = await axiosInstance.post('trainer/create-trainer', formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response)
    return response.data;
  },
  getTrainerDetails:async()=>{
    const response=await axiosInstance.get('trainer/get-trainer',{withCredentials:true})
    console.log(response)
    return response.data
  },
  reapplyTrainer:async(formData:FormData)=>{
        const response = await axiosInstance.post('trainer/re-apply', formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response)
    return response.data;
  },
  updateTrainerProfile:async(formData:FormData)=>{
      const response = await axiosInstance.post('trainer/update', formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response)
    return response.data;
  }
}