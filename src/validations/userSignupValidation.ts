import { type UserSignupDTO } from "../types/userType";
import { type ValidationErrors } from "./ValidationErrors";

export const userSignupValidation = (data: UserSignupDTO): ValidationErrors<UserSignupDTO> => {
  const errors: ValidationErrors<UserSignupDTO> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name || data.name.trim().length < 3) {
    errors.name = "Full name is required (min 3 characters)";
  }

  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  const password = data.password || "";
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
    errors.password = "Password must include uppercase, lowercase, and a number";
  }

  if (data.confirm !== data.password) {
    errors.confirm = "Passwords do not match";
  }

  return errors;
};