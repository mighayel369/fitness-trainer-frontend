import axiosInstance from "../api/AxiosInstance";

export const tokenService={
    clearRefreshToken:async()=>{
        const response=await axiosInstance.post('logout',{withCredentials:true})
        return response.data
    },

    verifyAccessToken:async()=>{
        const response=await axiosInstance.get('verify-userToken',{withCredentials:true})
        return response.data
    },
    verifyTrainerAccessToken:async()=>{
        const response=await axiosInstance.get('/trainer/verify-token',{withCredentials:true})
        return response.data
    }
}