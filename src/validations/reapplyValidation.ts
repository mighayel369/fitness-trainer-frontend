import { type ReapplyTrainerDTO } from "../types/trainerType";

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

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

  if (!data.services || data.services.length === 0) {
    newErrors.services = "Please select at least one specialization";
  }

  if (!data.languages || data.languages.length === 0) {
    newErrors.languages = "Please select at least one language";
  }

  if (!data.certificate && !document.querySelector('.existing-cert-link')) { 
      newErrors.certificate = "Please upload your certification documents";
  }

  return newErrors;
};