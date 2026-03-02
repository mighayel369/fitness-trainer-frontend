import { type UpdateWeeklySlotDTO,type SlotValidationResult } from "../types/slotType";

export const updateSlotValidate=(data:UpdateWeeklySlotDTO):SlotValidationResult=>{
 
      if (!data.startTime) {
    return {
      isValid: false,
      error: "Please select a start time"
    };
  }

  if (!data.endTime) {
    return {
      isValid: false,
      error: "Please select an end time"
    };
  }
  const startTime = new Date(`1970-01-01 ${data.startTime}`);
  const endTime = new Date(`1970-01-01 ${data.endTime}`);

  if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
    return {
      isValid: false,
      error: "Invalid time format"
    };
  }

  if (endTime <= startTime) {
    return {
      isValid: false,
      error: "End time must be later than start time"
    };
  }

  return { isValid: true };
}