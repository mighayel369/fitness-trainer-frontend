export type UpdateWeeklySlotDTO = {
  startTime?: string;
  endTime?: string;
};

export type SlotValidationResult = {
  isValid: boolean;
  error?: string;
};
