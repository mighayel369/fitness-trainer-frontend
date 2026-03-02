import axiosInstance from "../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../api/endPoints";

export const userWalletService={
    fetchUserWallet: async (page: number = 1, limit: number = 10) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.USER.WALLET, {
      params: { pageNO: page, limit },
    });
    return data;
  }
}