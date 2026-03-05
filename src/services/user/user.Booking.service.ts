import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";
export const userBookingService={
  fetchUserBookings: async (page: number, search: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.USER.BOOKINGS, {
      params: { pageNO: page, search }
    });
    return data;
  },
  createOnlinePaymentOrder:async(payload:any)=>{
    const {data}=await axiosInstance.post(API_ENDPOINTS.USER.CREATE_ORDER,payload)
    return data
  },
  verifyAndCreateBooking: async (payload: any) => {
     const { data } = await axiosInstance.post(API_ENDPOINTS.USER.VERIFY_PAYMENT, payload);
     console.log(data)
     return data;
  },
  getBookingById:async(id:string)=>{
    const {data}=await axiosInstance.get(API_ENDPOINTS.USER.GET_BOOKING_BY_ID(id))
    return data
  },
  rescheduleBooking:async (payload:any)=>{
    const {data}=await axiosInstance.post(API_ENDPOINTS.USER.RESCHEDULE_BOOKING,payload)
    return data
  },

  cancelBooking:async (bookingId:string)=>{
    const {data}=await axiosInstance.post(API_ENDPOINTS.USER.CANCEL_BOOKING(bookingId))
    return data
  }
}