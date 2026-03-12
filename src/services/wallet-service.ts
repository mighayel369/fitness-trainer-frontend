import axiosInstance from "../api/AxiosInstance";
import { API_ENDPOINTS } from "../api/endPoints";

export const WalletService={
   GetOwnerWallet: async (page:number,limit:number=10) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.WALLET.GET_DETAILS,{
      params:{
        pageNo:page,limit
      }
    });
    return data;
  }
}