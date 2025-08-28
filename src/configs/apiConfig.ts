export const apiConfig = {
  // BASE_URL: "http://localhost:5000/v1.0.0/apis",
  BASE_URL: "https://assignment-05-backend-hazel.vercel.app/v1.0.0/apis",
  USER: {
    REGISTER: "/users/register", // ✅
    VERIFY: "/users/verifyAccount", // ✅
    LOGIN: "/users/login", // ✅
    GET: "/users/me", // ✅
    LOGOUT: "/users/logout", // ✅
    UPDATE_USER: "/users/updateUser",
    UPDATE_PASSWORD: "/users/updatePassword",
    UPDATE_STATUS: "/users/updateActiveStatus",
  },
  RIDES: {
    GET_ALL: "/rides/activeRides",
    REQUEST: "/rides/requestRide",
    MY_RIDES: "/rides/viewMyRides",
    UPDATE_ACCEPT_STATUS: "/rides/updateRideAcceptStatus",
    UPDATE_STATUS: "/rides/updateRideStatus",
    GET_EARNING_HISTORY: "/rides/viewEarningHistory",
  },
  ADMIN: {
    GET_USERS: "/admin/getAllUsers",
    GET_RIDES: "/admin/getAllRides",
    UPDATE_BLOCK_STATUS: "/admin/updateUserBlockStatus",
    UPDATE_APPROVE_STATUS: "/admin/updateUserApproveStatus",
    ANALYTICS: "/admin/viewAnalytics",
  },
  SOS: {
    REQUEST: "/sos/requestSos",
    GET: "/sos/getRideSos",
    UPDATE: "/sos/updateStatus",
  },
};
