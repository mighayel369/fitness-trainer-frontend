


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
    VERIFY_USER_ACCOUNT: '/auth/verify-user',
    VERIFY_TRAINER_ACCOUNT: '/auth/verify-trainer',
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
    CLIENT_HISTORY: '/booking/user/history',
    CLIENT_DETAILS: (id: string) => `/booking/user/details/${id}`,
    RESCHEDULE_REQUEST: '/booking/reschedule/request',
    CANCEL: (bookingId: string) => `/booking/${bookingId}/cancel`,

    TRAINER_HISTORY: '/booking/trainer/history',
    TRAINER_DETAILS: (bookingId: string) => `/booking/trainer/details/${bookingId}`,
    PENDING_REQUESTS: '/booking/trainer/pending',
    RESCHEDULE_LIST: '/booking/trainer/reschedule-requests',
    ACCEPT_BOOKING:   '/booking/pending/accept',
    REJECT_BOOKING:'/booking/pending/reject',
    APPROVE_RESCHEDULE_REQUEST: '/booking/reschedule/approve',
    REJECT_RESCHEDULE_REQUEST:  '/booking/reschedule/reject',
  },
  PAYMENT: {
    INITIATE: '/payment/initiate',
    VERIFY: '/payment/verify'
  },
  WALLET: {
    GET_DETAILS: '/wallet'
  },
  PROGRAMS: {
  ONBOARD: '/programs/onboard',
  INVENTORY: '/programs/inventory',
  DETAILS: (id: string) => `/programs/details/${id}`,
  MODIFY: (id: string) => `/programs/modify/${id}`,
  ARCHIVE: (id: string) => `/programs/archive/${id}`,
  TOGGLE_VISIBILITY: (id: string) => `/programs/visibility/${id}`,
  DISCOVER: '/programs/explore', 
},
SLOT:{
  TRAINER_SCHEDULE:'/slot/schedule',
  MODIFY_WEEKLY_SCHEDULE:'/slot/weekly-template',
  AVAILABLE_BOOKING_SLOTS:'/slot/browse-availability'
},
DASHBOARD: {
    ADMIN_INSIGHTS: '/dashboard/admin',
    TRAINER_METRICS: '/dashboard/trainer/metrics',
    TRAINER_AGENDA: '/dashboard/trainer/agenda'
  },
LEAVE:{
  APPLY_LEAVE:'/leaves/apply',
  GET_LEAVE_REQUEST:'/leaves/leave-requests'
}
};