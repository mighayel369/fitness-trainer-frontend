import {type ReactNode } from "react";

export interface ColumnDefinition<T> {
  header: string;
  accessor: string;
  render?: (rowData: T) => ReactNode;
}

export interface TrainerBookingColumnActions {
  onView: (id: string) => void;
  onAction: (id: string, type: 'accept' | 'reject', context: 'booking' | 'reschedule') => void;
}