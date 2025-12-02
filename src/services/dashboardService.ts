import axiosInstance from "../api/AxiosInstance"

export const dashboardService={
    dashboardData:async()=>{
        const response=await axiosInstance.get('/admin/dashboard')
        console.log(response)
        return response.data.data
    }
}