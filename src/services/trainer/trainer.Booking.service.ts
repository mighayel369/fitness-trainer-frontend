import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";

export const trainerBookingervice={
 fetchTrainerAllBookings: async (page: number, search: string,limit:number) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.TRAINER.FETCH_ALL_BOOKINGS, {
      params: { pageNO: page, search,limit}
    });
    return data;
  },
  fetchTrainerPendingBookings:async(pageNo:number,search:string,limit:number)=>{
    const {data}=await axiosInstance.get(API_ENDPOINTS.TRAINER.FETCH_PENDING_BOOKINGS,{
      params:{pageNo,search,limit}
    })
    return data
  },
    fetchTrainerRescheduleRequests:async(pageNo:number,search:string,limit:number)=>{
    const {data}=await axiosInstance.get(API_ENDPOINTS.TRAINER.FETCH_RESCHEDULE_REQUESTS,{
      params:{pageNo,search,limit}
    })
    return data
  },
acceptPendingBooking: async (bookingId: string) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.TRAINER.ACCEPT_BOOKING(bookingId));
    return data;
  },
rejectPendingBooking: async (bookingId: string, reason?: string) => {
  const { data } = await axiosInstance.patch(
    API_ENDPOINTS.TRAINER.REJECT_BOOKING(bookingId), 
    { reason }
  );
  return data;
},
  handleRescheduleRequest: async (bookingId: string, action: string) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.TRAINER.HANDLE_RESCHEDULE_REQUESTS, { 
      bookingId, 
      action 
    });
    return data;
  },
  fetchBookingDetails:async(bookingId:string)=>{
    const {data}=await axiosInstance.get(API_ENDPOINTS.TRAINER.FETCH_BOOKING_DETAILS(bookingId))
    return data
  }
}