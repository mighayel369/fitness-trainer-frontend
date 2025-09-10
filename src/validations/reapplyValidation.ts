interface Data {
  name: string;
  gender?: string;
  experience?: string;
  certificate?: File;
  specializations?: string[];
  languages?:string[]
}

interface Errors {
  name?: string;
  gender?: string;
  experience?: string;
  specializations?: string;
  languages?:string
}

export const reapplyValidation = (data: Data): Errors => {
  const newErrors: Errors = {};

  if (!data.name.trim()) {
    newErrors.name = "Full name is required";
  }

  if (data.gender !== undefined && data.gender.trim() === "") {
    newErrors.gender = "Gender is required";
  }

  if (data.experience !== undefined && data.experience.trim() === "") {
    newErrors.experience = "Experience is required";
  }


  if (data.specializations !== undefined && data.specializations.length === 0) {
    newErrors.specializations = "Please select at least one specialization";
  }
  
  return newErrors;
};
