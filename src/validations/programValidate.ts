import {type OnboardNewProgramDTO } from "../types/programType";
import {type  ValidationErrors } from "./ValidationErrors";
export const programValidate = (data: OnboardNewProgramDTO) => {
  const errors: ValidationErrors<OnboardNewProgramDTO> = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = "Program name must be at least 3 characters";
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters";
  }

  if (!data.duration) {
    errors.duration = "Duration is required";
  } else if (data.duration < 60 || data.duration > 180) {
    errors.duration = "Duration must be between 60 and 180 minutes";
  }

  return errors;
};
