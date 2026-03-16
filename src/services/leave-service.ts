import axiosInstance from "../api/AxiosInstance"
import { API_ENDPOINTS } from "../api/endPoints"


export const LeaveService={
    applyForLeave:async(formData:FormData)=>{
        const {data}=await axiosInstance.post(API_ENDPOINTS.LEAVE.APPLY_LEAVE,formData,{
          headers:{'Content-Type':'multipart/form-data'}
        })
        return data
    },
    GET_ALL_REQUESTS:async()=>{
        const {data}=await axiosInstance.get(API_ENDPOINTS.LEAVE.GET_LEAVE_REQUEST)
        return data
    }
}