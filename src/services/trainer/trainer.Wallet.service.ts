import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";

export const trainerWalletService={
    fetchTrainerWallet: async (page:number,limit:number=10) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.TRAINER.WALLET,{
      params:{
        pageNo:page,limit
      }
    });
    return data;
  }
}