import axiosInstance from "../api/AxiosInstance";
import { API_ENDPOINTS } from "../api/endPoints";

export const BookingService={
    ClientBookingHistory: async (page: number, search: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.BOOKING.CLINET_BOOKING_HISTORY, {
      params: { pageNO: page, search }
    });
    return data;
  },
  BookSessionWithTrainer: async (payload: any) => {
     const { data } = await axiosInstance.post(API_ENDPOINTS.BOOKING.CHECKOUT, payload);
     console.log(data)
     return data;
  },
  BookingDetails:async(id:string)=>{
    const {data}=await axiosInstance.get(API_ENDPOINTS.BOOKING.(id))
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