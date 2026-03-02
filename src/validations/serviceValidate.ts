import {type CreateServiceDTO } from "../types/serviceType";

export const serviceValidate = (data: CreateServiceDTO) => {
  const errors: Partial<Record<keyof CreateServiceDTO, string>> = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = "Service name must be at least 3 characters";
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters";
  }

  if (!data.duration) {
    errors.duration = "Duration is required";
  } else if (data.duration < 10 || data.duration > 180) {
    errors.duration = "Duration must be between 10 and 180 minutes";
  }

  return errors;
};
