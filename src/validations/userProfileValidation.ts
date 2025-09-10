
interface UserProfile {
    email: string; 
    name: string;
    phone: string;
    address: string;
    }

interface Errors{
    email?:
    string;
    name?:
    string;
    phone?:
    string;
    address?:
    string;
    }

export const validateUserProfile = (data: UserProfile): Errors => {
  const newErrors: Errors = {};


  if (!data.name || !data.name.trim()) {
    newErrors.name = "Full name is required";
  } else if (data.name.length < 3) {
    newErrors.name = "Full name must be at least 3 characters";
  }

  if (!data.email || !data.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    newErrors.email = "Email is invalid";
  }

  if (!data.phone || !data.phone.trim()) {
    newErrors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(data.phone)) {
    newErrors.phone = "Phone number must be 10 digits";
  }

  if (!data.address || !data.address.trim()) {
    newErrors.address = "Address is required";
  } else if (data.address.length < 5) {
    newErrors.address = "Provide A Valid Address";
  }

  return newErrors;
};
