import { type TrainerSignupDTO } from "../types/trainerType";
import { type ValidationErrors } from "./ValidationErrors";

export const trainerSignupValidate = (data: TrainerSignupDTO): ValidationErrors<TrainerSignupDTO> => {
  const errors: ValidationErrors<TrainerSignupDTO> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name || data.name.trim().length < 3) {
    errors.name = "Full name is required (min 3 chars)";
  }

  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Please enter a valid professional email";
  }

  const password = data.password || ""; 
  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(password)) {
    errors.password = "Include at least one uppercase letter";
  } else if (!/[a-z]/.test(password)) {
    errors.password = "Include at least one lowercase letter";
  } else if (!/[0-9]/.test(password)) {
    errors.password = "Include at least one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.password = "Include at least one special character";
  }

  if (data.confirm !== data.password) {
    errors.confirm = "Passwords do not match";
  }

  if (!data.gender) errors.gender = "Gender is required";
  if (!data.experience) errors.experience = "Experience level is required";

  if (!data.pricePerSession || data.pricePerSession <= 0) {
    errors.pricePerSession = "Please set a valid price per session";
  }

  if (!data.programs || data.programs.length === 0) {
    errors.programs = "Select at least one specialty";
  }

  if (!data.languages || data.languages.length === 0) {
    errors.languages = "Select at least one language";
  }

  if (!data.certificate) {
    errors.certificate = "Certification file is required";
  }

  return errors;
};