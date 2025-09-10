interface Data {
  email: string;
  name: string;
  password: string;
  confirm: string;
  gender?: string;
  experience?: string;
  certificate?: File;
  specializations?: string[];
}

interface Errors {
  email?: string;
  name?: string;
  password?: string;
  confirm?: string;
  gender?: string;
  experience?: string;
  certificate?: string;
  specializations?: string;
}

export const signupValidate = (data: Data): Errors => {
  const newErrors: Errors = {};

  if (!data.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    newErrors.email = "Email is invalid";
  }

  if (!data.name.trim()) {
    newErrors.name = "Full name is required";
  }

  const password = data.password;
  if (!password.trim()) {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  } else if (!/[A-Z]/.test(password)) {
    newErrors.password = "Password must include at least one uppercase letter";
  } else if (!/[a-z]/.test(password)) {
    newErrors.password = "Password must include at least one lowercase letter";
  } else if (!/[0-9]/.test(password)) {
    newErrors.password = "Password must include at least one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    newErrors.password = "Password must include at least one special character";
  }

  if (!data.confirm.trim()) {
    newErrors.confirm = "Please confirm your password";
  } else if (data.confirm !== data.password) {
    newErrors.confirm = "Passwords do not match";
  }

  if (data.gender !== undefined && data.gender.trim() === "") {
    newErrors.gender = "Gender is required";
  }

  if (data.experience !== undefined && data.experience.trim() === "") {
    newErrors.experience = "Experience is required";
  }

  if (data.certificate !== undefined && !(data.certificate instanceof File)) {
    newErrors.certificate = "Certificate upload is required";
  }

  if (data.specializations !== undefined && data.specializations.length === 0) {
    newErrors.specializations = "Please select at least one specialization";
  }

  return newErrors;
};
