export type TrainerSignupDTO = {
  name: string;
  email: string;
  password?: string;
  confirm?: string;
  gender: string;
  experience: number;
  pricePerSession: number;
  programs: string[];
  languages: string[];
  certificate?: File | null;
};

export type TrainerLoginDTO = {
  email: string;
  password?: string;
};


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
  programs: string; 
}

export interface PendingTrainer extends Omit<Trainer,'status'|'email'>{
  gender: string;
  programs: string[];
}

export interface AdminTrainerDetails extends Trainer {
  profilePic: string | null;
  verified: "pending" | "accepted" | "rejected";
  certificate: string;
  joined: string;
  gender: string;
  programs: {programId:string,name:string}[]; 
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
  programs: string[]; 
}

export interface ReapplyTrainerDTO {
  name: string;
  gender: string;
  experience: number;
  programs: string[]; 
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
    programs: { programId: string; name: string }[];
    role: string;
    experience: number;
    languages:string[];
    rejectReason?: string;
    phone?:string
}