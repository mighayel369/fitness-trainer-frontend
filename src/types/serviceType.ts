
export type Service = {
  serviceId: string;
  name: string;
  description: string;
  duration: number;
  servicePic: string;
  status: boolean;
};


export type CreateServiceDTO = {
  name: string;
  description: string;
  duration: number;
};


export type UpdateServiceDTO = {
  name?: string;
  description?: string;
  duration?: number;
  status?: boolean;
};


