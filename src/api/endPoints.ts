
// export const API_ENDPOINTS = {
//   AUTH: {
//     LOGOUT: '/logout',
//     VERIFY_USER_TOKEN: '/verify-userToken',
//     FORGOT_PASSWORD: '/forgot-password',
//     RESET_PASSWORD: (token: string) => `/reset-password/${token}`,
//   },
//   PUBLIC:{
//     GET_PUBLIC_SERVICES:'/public/services',
//        REFRESH_TOKEN: '/public/refresh-token',
//        RESEND_OTP:'/public/resend-otp',
//        VERIFY_USER_OTP:'/public/verify-otp/user',
//        VERIFY_TRAINER_OTP:'/public/verify-otp/trainer'
//   },
//   ADMIN: {
//     LOGIN: '/admin/login',
//     DASHBOARD: '/admin/dashboard',
//     WALLET: '/admin/get-adminwallet',
//     SERVICES: {
//       BASE: '/admin/services',
//       ADD: '/admin/services/add',
//       BY_ID: (id: string) => `/admin/services/${id}`,
//       STATUS_BY_ID: (id: string) => `/admin/services/status/${id}`,
//     },
//     TRAINERS: {
//       BASE: '/admin/trainers',
//       PENDING: '/admin/pending-trainers',
//       BY_ID: (id: string) => `/admin/trainers/${id}`,
//       VERIFY_ACTION: (id: string) => `/admin/verify-trainer-action/${id}`,
//       STATUS_BY_ID: (id: string) => `/admin/trainer/status/${id}`
//     },
//     USERS: {
//       BASE: '/admin/users',
//       BY_ID: (id: string) => `/admin/users/${id}`,
//       STATUS_BY_ID: (id: string) => `/admin/user/status/${id}`,
//     },
//   },
//   TRAINER: {
//     LOGIN: '/trainer/login',
//     CREATE: '/trainer/create-trainer',
//     GET_DETAILS: '/trainer/get-trainer',
//     REAPPLY: '/trainer/re-apply',
//     UPDATE: '/trainer/update',
//     UPDATE_PIC: '/trainer/update-profilepic',
//     SLOTS: '/trainer/get-slots',
//     UPDATE_WEEKLY_SLOTS: '/trainer/update-weeklyslots',
//     WALLET: '/trainer/get-trainerwallet',
//     VERIFY_TOKEN: '/trainer/verify-token',
//     FETCH_ALL_BOOKINGS:"/trainer/bookings/all-bookings",
//     FETCH_PENDING_BOOKINGS: "/trainer/bookings/pending",
//     FETCH_RESCHEDULE_REQUESTS: "/trainer/bookings/reschedule-requests",
//     HANDLE_RESCHEDULE_REQUESTS:"/trainer/booking/reschedule-action",
//     ACCEPT_BOOKING: (id: string) => `/trainer/bookings/accept/${id}`,
//     REJECT_BOOKING: (id: string) => `/trainer/bookings/reject/${id}`,
//     FETCH_BOOKING_DETAILS:(id:string)=>`/trainer/bookings/${id}`,
//     TRAINER_DASHBOARD:'/trainer/dashboard',
//      TRAINER_DASHBOARD_APPOINMENT:'/trainer/dashboard/appointment'
//   },
//   USER: {
//     LOGIN: '/login',
//     SIGNUP: '/create-user',
//     UPDATE_PIC: '/update-userprofilepic',
//     GET_SERVICES: '/get-services',
//     LIST_TRAINERS: '/list-trainers',
//     FETCH_TRAINER:(id:string)=>`/trainer/${id}`,
//     TRAINER_SLOTS: '/trainer-slots',
//     WALLET: '/get-userwallet',
//     BOOKINGS: '/bookings',
//     BOOKING_WALLET: '/booking/wallet',
//     FETCH_USER_PROFILE:"/user-details",
//     UPDATE_USER_PROFILE:"/update-userdata",
//     CHANGE_PASSWORD:"/change-password",
//     CREATE_ORDER:'/booking/create-order',
//     VERIFY_PAYMENT:'/booking/verify-payment',
//     GET_BOOKING_BY_ID:(id:string)=>`/bookings/${id}`,
//     RESCHEDULE_BOOKING:'/booking/reschedule',
//     CANCEL_BOOKING:(id:string)=>`/booking/cancel/${id}`
//   },
// };


export const API_ENDPOINTS = {
  AUTH: {
    LOGIN_USER: '/auth/user/login',
    REGISTER_USER: '/auth/user/register',
    LOGIN_TRAINER: '/auth/trainer/login',
    REGISTER_TRAINER: '/auth/trainer/register',
    REAPPLY_TRAINER: '/auth/trainer/re-apply',
    LOGIN_ADMIN: '/auth/admin/login',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: (token: string) => `/auth/reset-password/${token}`,
    CHANGE_PASSWORD: '/auth/change-password',
    REFRESH_TOKEN: '/auth/refresh-token',
    RESEND_OTP: '/auth/resend-otp',
    VERIFY_USER_OTP: '/auth/verify-user',
    VERIFY_TRAINER_OTP: '/auth/verify-trainer',
    GOOGLE_AUTH: '/auth/google',
    VERIFY_USER_ACCOUNT: '/user/verify-user',
  },

TRAINER: {
    EXPLORE: '/trainer/explore',
    DETAILS: (id: string) => `/trainer/explore/${id}`,

      GET_FULL_PROFILE: '/trainer/profile',
      UPDATE_PROFILE: '/trainer/profile',
      UPDATE_AVATAR: '/trainer/profile/avatar',


      LIST_VERIFIED: '/trainer/admin/list/verified',
      LIST_PENDING: '/trainer/admin/list/pending',
      GET_DETAILS: (id: string) => `/trainer/admin/details/${id}`,
      UPDATE_STATUS: (id: string) => `/trainer/admin/status/${id}`,
      HANDLE_APPROVAL: (id: string) => `/trainer/verify-trainer-action/${id}`,
  },

  USER: {
    GET_ALL: '/user/admin/all',
    GET_DETAILS: (id: string) => `/user/admin/details/${id}`,
    UPDATE_STATUS: (id: string) => `/user/admin/update-status/${id}`,
    GET_FULL_PROFILE: '/user/profile/full',
    UPDATE_PROFILE: '/user/profile/update',
    UPDATE_PROFILE_IMAGE: '/user/profile/image',
  },
  BOOKING: {
      CHECKOUT: '/booking/checkout',
      CLINET_BOOKING_HISTORY: '/booking/user/history',
      RESCHEDULE_REQUEST: '/booking/reschedule/request',
      CANCEL: (bookingId: string) => `/booking/${bookingId}/cancel`,

      BOOKING_HISTORY: '/booking/trainer/history',
      PENDING_REQUESTS: '/booking/trainer/pending',
      ACCEPT: (bookingId: string) => `/booking/${bookingId}/accept`,
      REJECT: (bookingId: string) => `/booking/${bookingId}/reject`,
      RESCHEDULE_PROCESS: '/booking/reschedule/process',
  }
};