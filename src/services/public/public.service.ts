import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";
export const PublicService = {
    fetchPublicServices:async()=>{
        const {data}=await axiosInstance.get(API_ENDPOINTS.PUBLIC.GET_PUBLIC_SERVICES)
        return data
    },
};