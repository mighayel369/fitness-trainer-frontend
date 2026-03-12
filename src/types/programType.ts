
export type Program = {
  programId: string;
  name: string;
  description: string;
  duration: number;
  programPic: string;
  isPublished: boolean;
};


export interface DiscoveryProgram extends Omit<Program, 'duration' | 'isPublished'> {}

export type OnboardNewProgramDTO = {
  name: string;
  description: string;
  duration: number;
  programPic:File;
};


export type ModifyProgramDTO = {
  name?: string;
  description?: string;
  duration?: number;
  status?: boolean;
  programPic?:File
};


