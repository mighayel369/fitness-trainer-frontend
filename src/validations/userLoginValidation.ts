import { type UserLoginDTO } from "../types/userType";
import { type ValidationErrors } from "./ValidationErrors";

export const userLoginValidation = (data: UserLoginDTO): ValidationErrors<UserLoginDTO> => {
  const errors: ValidationErrors<UserLoginDTO> = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Valid email is required";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
};