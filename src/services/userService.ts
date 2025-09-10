
import axiosInstance from '../api/AxiosInstance';

interface LoginResponse {
  success: boolean;
  accessToken?: string;
  message?: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
}

interface OtpResponse{
  success:boolean,
  message?:string
}

export const userService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post('/login', { email, password }, { withCredentials: true });
    console.log(response)
    return response.data;
  },

  googleLogin: () => {
    window.location.href = "http://localhost:5000/auth/google";
  },

  signup:async(name:string,email:string,password:string):Promise<SignupResponse>=>{
        const response = await axiosInstance.post('/create-user', {name, email, password }, { withCredentials: true });
    console.log(response)
    return response.data.result;
  },
  otpsent:async(email:string|null,role:string|null):Promise<OtpResponse>=>{
    const response=await axiosInstance.post('/send-otp',{email,role},{withCredentials:true})
    console.log(response)
    return response.data
  },
  sendForgotPasswordLink : async (email: string) => {
  const response = await axiosInstance.post('/forgot-password', { email }, { withCredentials: true });
  return response.data;
},

resetPassword:async(token:string|undefined,password:string)=>{
  const response = await axiosInstance.post(`/reset-password/${token}`, { password }, { withCredentials: true });
  return response.data
},

verifyOtp:async(email:string|null,otpCode:string)=>{
  const response=await axiosInstance.post('/verify-otp', { email, otp: otpCode }, { withCredentials: true })
  console.log(response)
  return response.data
}
};