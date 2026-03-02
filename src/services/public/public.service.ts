import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";
export const PublicService = {
    fetchPublicServices:async()=>{
        const {data}=await axiosInstance.get(API_ENDPOINTS.PUBLIC.GET_PUBLIC_SERVICES)
        return data
    },
    refreshAccessToken:async()=>{
        const {data}=await axiosInstance.post(API_ENDPOINTS.PUBLIC.REFRESH_TOKEN)
        return data
    },
    verifyTrainerOtp: async (email: string | null, otpCode: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.PUBLIC.VERIFY_TRAINER_OTP, { email, otp: otpCode });
    return data;
    },
    verifyUserOtp: async (email: string | null, otpCode: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.PUBLIC.VERIFY_USER_OTP, { email, otp: otpCode });
    return data;
    },
    resndOtp: async (email: string | null, role: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.PUBLIC.RESEND_OTP, { email, role });
    return data;
    }
};