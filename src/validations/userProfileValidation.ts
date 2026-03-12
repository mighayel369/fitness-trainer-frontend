import {type UpdateUserProfileDTO } from "../types/userType";
import { type ValidationErrors } from "./ValidationErrors";


export const validateUserProfile = (
  data: UpdateUserProfileDTO
): ValidationErrors<UpdateUserProfileDTO> => {
  const errors: ValidationErrors<UpdateUserProfileDTO> = {};

  if (!data.name?.trim()) {
    errors.name = "Full name is required";
  } else if (data.name.trim().length < 3) {
    errors.name = "Full name must be at least 3 characters";
  }

  if (!data.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(data.phone)) {
    errors.phone = "Enter a valid 10-digit phone number";
  }

  if (!data.address?.trim()) {
    errors.address = "Address is required";
  } else if (data.address.trim().length < 5) {
    errors.address = "Address must be at least 5 characters";
  }

  if (data.gender && !["male", "female", "other"].includes(data.gender.toLowerCase())) {
    errors.gender = "Gender must be Male, Female, or Other";
  }

  if (data.age !== undefined) {
    if (isNaN(data.age)) {
      errors.age = "Age must be a number";
    } else if (data.age < 10 || data.age > 100) {
      errors.age = "Age must be between 10 and 100";
    }
  }

  return errors;
};