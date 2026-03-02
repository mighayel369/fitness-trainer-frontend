
export interface Trainer {
  trainerId: string; 
  name: string;
  email: string;
  status: boolean;
  pricePerSession: number;
}

export interface UserSideTrainer extends Trainer {
  profilePic: string | null;
  rating: number;
  experience: number;
  address: string | null;
  serviceName: string; 
}

export interface PendingTrainer extends Omit<Trainer,'status'|'email'>{
  gender: string;
  services: string[];
}

export interface AdminTrainerDetails extends Trainer {
  profilePic: string | null;
  verified: "pending" | "accepted" | "rejected";
  certificate: string;
  joined: string;
  gender: string;
  services: {serviceId:string,name:string}[]; 
  role: string;
  experience: number;
  bio?: string | null;
  phone?: string | null;
  address?: string | null;
  languages?:string[]
  rejectReason?: string;
}

export interface TrainerPrivateProfileDTO extends AdminTrainerDetails{
    address: string;
    bio: string;
}

export interface UpdateTrainerProfileDTO {
  name: string;
  gender: string;
  experience: number;
  languages: string[];
  bio: string;
  phone: string;
  address: string;
  pricePerSession: number;
  services: string[]; 
}

export interface ReapplyTrainerDTO {
  name: string;
  gender: string;
  experience: number;
  services: string[]; 
  languages: string[];
  pricePerSession:number;
  certificate?: File | null;
}

export interface TrainerDetails{
    trainerId: string;
    name: string;
    email: string;
    status: boolean;
    profilePic: string;
    pricePerSession: number;
    verified: string;
    certificate: string;
    joined: string;
    gender: string;
    services: { serviceId: string; name: string }[];
    role: string;
    experience: number;
    languages:string[];
    rejectReason?: string;
    phone?:string
}