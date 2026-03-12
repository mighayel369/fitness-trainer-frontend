import axiosInstance from "../api/AxiosInstance";
import { API_ENDPOINTS } from "../api/endPoints";

export const ProgramService={
   DiscoverPrograms: async () => {
       const { data } = await axiosInstance.get(API_ENDPOINTS.PROGRAMS.DISCOVER);
       return data;
   },
    FetchProgramsInventory: async (page: number, search: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.PROGRAMS.INVENTORY, {
      params: { pageNO: page, search }
    });
    return data;
  },
  ToggleProgramVisibility: async (id: string, newStatus: boolean) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.PROGRAMS.TOGGLE_VISIBILITY(id), { status: newStatus });
    console.log(data)
    return data;
  },
  OnBoardNewProgram: async (formData: any) => {
    console.log(formData)
    const { data } = await axiosInstance.post(API_ENDPOINTS.PROGRAMS.ONBOARD, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
  ProgramDetails: async (id: string) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.PROGRAMS.DETAILS(id));
    return data;
  },
  ArchiveProgram: async (id: string) => {
    const { data } = await axiosInstance.delete(API_ENDPOINTS.PROGRAMS.ARCHIVE(id));
    return data;
  },
  ModifyProgram: async (id: string, payload: any) => {
    const { data } = await axiosInstance.patch(API_ENDPOINTS.PROGRAMS.MODIFY(id), payload);
    return data;
  }
}