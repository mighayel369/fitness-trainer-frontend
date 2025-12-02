import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import otpReducer from './slices/otpSlice'

export const store=configureStore({
    reducer:{
        auth:authReducer,
        otp:otpReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;