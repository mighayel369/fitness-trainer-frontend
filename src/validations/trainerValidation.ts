interface Data {
  name: string;
  gender?: string;
  experience?: string;
  certificate?: File;
  specializations?: string[];
  languages?: string[];
  bio?: string;
  phone?: string;
  address?: string;
  pricing?: number;
}

interface Errors {
  name?: string;
  gender?: string;
  experience?: string;
  specializations?: string;
  languages?: string;
  bio?: string;
  phone?: string;
  address?: string;
  pricing?: string;
  certificate?: string;
}

export const trainerValidation = (data: Data): Errors => {
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

  if (data.languages !== undefined && data.languages.length === 0) {
    newErrors.languages = "Please select at least one language";
  }

  if (data.bio !== undefined && data.bio.trim() === "") {
    newErrors.bio = "Bio is required";
  }

  if (data.phone !== undefined) {
    if (!/^\d{10}$/.test(data.phone)) {
      newErrors.phone = "Phone must be a valid 10-digit number";
    }
  }

  if (data.address !== undefined && data.address.trim() === "") {
    newErrors.address = "Address is required";
  }

  if (data.pricing !== undefined) {
    if (isNaN(data.pricing) || data.pricing <= 0) {
      newErrors.pricing = "Pricing must be greater than 0";
    }
  }

    if (data.certificate) {
    if (!data.certificate.type.startsWith("image/")) {
        newErrors.certificate = "Certificate must be an image file";
    }
    }

  return newErrors;
};
