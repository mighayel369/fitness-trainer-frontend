
import axiosInstance from "../api/AxiosInstance";

export const adminServiceManagement = {
      fetchServices: async (page: number, search: string) => {
        const response = await axiosInstance.get(`admin/services?pageNO=${page}&search=${search}`,{ withCredentials: true });
        console.log(response)
        return response.data;
      },
      updateServiceStatus: async (id: string, newStatus: boolean) => {
        console.log(newStatus)
        const response = await axiosInstance.patch(
          `admin/services/${id}`,
          { status: newStatus },
          { withCredentials: true }
        );
        return response.data;
      },
      createNewService:async(name:string,description:string)=>{
        const response=await axiosInstance.post(
          'admin/services/add',{name,description},
          {withCredentials:true}
        )
        return response.data
      },
      getServiceById: async (serviceId: string | undefined) => {
        const response = await axiosInstance.get(
          `/admin/services/${serviceId}`,
          { withCredentials: true }
        );
        console.log(response)
        return response.data;
},
      deleteServiceById:async(serviceId:string)=>{
        const response=await axiosInstance.delete(`/admin/services/${serviceId}`)
        return response.data
      },
 updateService: async (serviceId: string | undefined,payload: { name?: string; description?: string; status?: boolean }) => {
  const response = await axiosInstance.patch(`/admin/services/${serviceId}`,payload,{ withCredentials: true });
  return response.data;
},

}