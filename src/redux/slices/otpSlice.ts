import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit';

interface emailState {
    Useremail:string | null,
    role:string|null
}

const initialState : emailState={
    Useremail:null,
    role:null
}

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
  setEmail: (state, action: PayloadAction<string>) => {
  state.Useremail = action.payload; 
  },
    setEmailNull: (state) => {
      state.Useremail=null
    },
   setRole: (state, action: PayloadAction<string>) => {
  state.role = action.payload; 
  },
    setRoleNull: (state) => {
      state.role=null
    },
  }
});

export const {setEmail,setEmailNull,setRole,setRoleNull} = otpSlice.actions;
export default otpSlice.reducer