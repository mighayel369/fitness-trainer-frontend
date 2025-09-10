import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import otpReducer from './slices/otpSlice'
import errorReducer from './slices/errorSlice'
export const store=configureStore({
    reducer:{
        auth:authReducer,
        otp:otpReducer,
        error:errorReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;