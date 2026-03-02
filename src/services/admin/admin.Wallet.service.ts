import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";
export const adminWalletService={
    getAdminWallet: async (page:number,limit:number=5) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.WALLET,{
      params:{
        pageNo:page,
        limit
      }
    });
    return data;
  }
}