import axiosInstance from "../api/AxiosInstance";
import { API_ENDPOINTS } from "../api/endPoints";

export const BookingService={
    ClientBookingHistory: async (page: number, search: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.BOOKING.CLIENT_HISTORY, {
      params: { pageNO: page, search }
    });
    return data;
  },
  BookSessionWithTrainer: async (payload: any) => {
     const { data } = await axiosInstance.post(API_ENDPOINTS.BOOKING.CHECKOUT, payload);
     console.log(data)
     return data;
  },
  SessionDetails:async(id:string)=>{
    const {data}=await axiosInstance.get(API_ENDPOINTS.BOOKING.CLIENT_DETAILS(id))
    return data
  },
  RescheduleSession:async (payload:any)=>{
    const {data}=await axiosInstance.post(API_ENDPOINTS.BOOKING.RESCHEDULE_REQUEST,payload)
    return data
  },

  CancelSession:async (bookingId:string)=>{
    const {data}=await axiosInstance.delete(API_ENDPOINTS.BOOKING.CANCEL(bookingId))
    return data
  },



  TrainerSessionHistory: async (page: number, search: string,limit:number) => {
      const { data } = await axiosInstance.get(API_ENDPOINTS.BOOKING.TRAINER_HISTORY, {
        params: { pageNO: page, search,limit}
      });
      return data;
    },
    PendingSessionsRequests:async(pageNo:number,search:string,limit:number)=>{
      const {data}=await axiosInstance.get(API_ENDPOINTS.BOOKING.PENDING_REQUESTS,{
        params:{pageNo,search,limit}
      })
      return data
    },
    RescheduleSessionsRequests:async(pageNo:number,search:string,limit:number)=>{
      const {data}=await axiosInstance.get(API_ENDPOINTS.BOOKING.RESCHEDULE_LIST,{
        params:{pageNo,search,limit}
      })
      return data
    },
  PendingRequestAccept: async (bookingId: string) => {
      const { data } = await axiosInstance.patch(API_ENDPOINTS.BOOKING.ACCEPT_BOOKING,{bookingId});
      return data;
    },
  PendingRequestReject: async (bookingId: string, reason: string) => {
    const { data } = await axiosInstance.patch(
      API_ENDPOINTS.BOOKING.REJECT_BOOKING, 
      { reason,bookingId }
    );
    return data;
  },
   ApproveReschedule: async (bookingId: string) => {
      const { data } = await axiosInstance.patch(API_ENDPOINTS.BOOKING.APPROVE_RESCHEDULE_REQUEST, { 
        bookingId
      });
      return data;
    },
    RejectReschedule: async (bookingId: string,reason:string) => {
    console.log(bookingId)
      const { data } = await axiosInstance.patch(API_ENDPOINTS.BOOKING.REJECT_RESCHEDULE_REQUEST, { 
        bookingId,
        reason
      });
      return data;
    },
   TrainerSessionDetails:async(bookingId:string)=>{
      const {data}=await axiosInstance.get(API_ENDPOINTS.BOOKING.TRAINER_DETAILS(bookingId))
      return data
    }
}