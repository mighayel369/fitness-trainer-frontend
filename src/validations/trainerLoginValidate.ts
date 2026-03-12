import { type TrainerLoginDTO } from "../types/trainerType";
import { type ValidationErrors } from "./ValidationErrors";

export const trainerLoginValidate = (data: TrainerLoginDTO): ValidationErrors<TrainerLoginDTO> => {
  const errors: ValidationErrors<TrainerLoginDTO> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Valid email is required";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
};