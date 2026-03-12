import { type ReapplyTrainerDTO } from "../types/trainerType";
import { type ValidationErrors } from "./ValidationErrors";

export const reapplyValidation = (data: ReapplyTrainerDTO): ValidationErrors<ReapplyTrainerDTO> => {
  const newErrors: ValidationErrors<ReapplyTrainerDTO> = {};

  if (!data.name?.trim()) {
    newErrors.name = "Full name is required";
  }

  if (!data.gender) {
    newErrors.gender = "Gender is required";
  }

  if (!data.experience) {
    newErrors.experience = "Experience level is required";
  }

  if (!data.programs || data.programs.length === 0) {
    newErrors.programs = "Please select at least one program";
  }

  if (!data.languages || data.languages.length === 0) {
    newErrors.languages = "Please select at least one language";
  }

  if (!data.certificate && !document.querySelector('.existing-cert-link')) { 
      newErrors.certificate = "Please upload your certification documents";
  }

  return newErrors;
};