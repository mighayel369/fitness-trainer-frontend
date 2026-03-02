import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";
import { type UpdateUserProfileDTO } from "../../types/userType";
export const userProfileService={
   updateUserProfilePic: async (formData: FormData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.USER.UPDATE_PIC, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },
  fetchUserProfile: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.USER.FETCH_USER_PROFILE);
    return data;
  },
  updateUserProfile: async (formData: UpdateUserProfileDTO) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_USER_PROFILE, formData);
    return data;
  },
  changePassword:async(payload:any)=>{
    console.log(payload)
    const {data}=await axiosInstance.post(API_ENDPOINTS.USER.CHANGE_PASSWORD,{payload})
    return data
  }
}