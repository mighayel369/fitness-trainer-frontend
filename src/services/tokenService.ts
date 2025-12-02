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
        console.log('verifying')
        const response=await axiosInstance.get('trainer/verify-token',{withCredentials:true})
        console.log('verifying trainer token')
        console.log(response.data)
        return response.data
    }
}