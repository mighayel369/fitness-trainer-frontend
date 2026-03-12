
import { type ValidationErrors } from "./ValidationErrors";
import {type AdminLoginDTO } from "../types/adminType";
export const adminLoginValidation = (data: AdminLoginDTO): ValidationErrors<AdminLoginDTO> => {
  const errors: ValidationErrors<AdminLoginDTO> = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Valid email is required";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
};