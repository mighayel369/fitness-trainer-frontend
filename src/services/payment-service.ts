import axiosInstance from "../api/AxiosInstance";
import { API_ENDPOINTS } from "../api/endPoints";

export const PaymentService={
    InitiateOnlinePaymentOrder:async(payload:any)=>{
    const {data}=await axiosInstance.post(API_ENDPOINTS.PAYMENT.INITIATE,payload)
    return data
  }
}