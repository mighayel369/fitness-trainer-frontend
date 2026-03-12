import axiosInstance from "../api/AxiosInstance";
import { API_ENDPOINTS } from "../api/endPoints";
import type { AdminLoginDTO } from "../types/adminType";
import type { TrainerLoginDTO } from "../types/trainerType";
import type { UserLoginDTO } from "../types/userType";

export const AuthService={
  LoginAdmin: async (payload:AdminLoginDTO) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN_ADMIN, payload);
    return data;
  },
  LoginTrainer: async (payload:TrainerLoginDTO) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN_TRAINER, payload);
    return data;
  },
  LoginUser: async (payload:UserLoginDTO) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN_USER, payload);
    console.log(data)
    return data;
  },
   RegisterUser: async (name: string, email: string, password: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER_USER, { name, email, password });
    return data
  },
   RegisterTrainer: async (formData: FormData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER_TRAINER, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  ReapplyTrainer: async (formData: FormData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.REAPPLY_TRAINER, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
},
  GoogleLogin: () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  },
  ReSendOtp: async (email: string | null, role: string | null) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.RESEND_OTP, { email, role });
    return data;
  },
  ForgotPassword: async (email: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return data;
  },
  
  ResetPassword: async (token: string, password: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD(token), { password });
    return data;
  },
  VerifyTrainerOtp: async (email: string | null, otpCode: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.VERIFY_TRAINER_OTP, { email, otp: otpCode });
    return data;
    },
  VerifyUserOtp: async (email: string | null, otpCode: string) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.VERIFY_USER_OTP, { email, otp: otpCode });
    return data;
    },
    RefreshAccessToken:async ()=>{
        const {data}=await axiosInstance.get(API_ENDPOINTS.AUTH.REFRESH_TOKEN)
        return data
    },
   ChangePassword:async(payload:any)=>{
    console.log(payload)
    const {data}=await axiosInstance.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD,{payload})
    return data
  },
    VerifyUserAccount:async()=>{
   
    const {data}=await axiosInstance.get(API_ENDPOINTS.AUTH.VERIFY_USER_ACCOUNT)
    return data
  },
  VerifyTrainerAccount:async()=>{

    const {data}=await axiosInstance.get(API_ENDPOINTS.AUTH.VERIFY_TRAINER_ACCOUNT)
    return data
  },
  Logout: async () => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    return data;
  },
}