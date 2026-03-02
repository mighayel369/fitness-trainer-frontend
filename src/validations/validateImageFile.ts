export type ImageValidationOptions = {
  required?: boolean;
};

export const validateImageFile = (file: File | undefined,options: ImageValidationOptions = {}): string | null => {
  const {
    required = false
  } = options;

  if (required && !file) {
    return "Image is required";
  }

  if (!file) return null;

  return null;
};
