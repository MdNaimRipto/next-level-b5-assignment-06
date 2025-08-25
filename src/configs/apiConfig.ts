export const apiConfig = {
  BASE_URL: "http://localhost:5000/v1.0.0/apis",
  USER: {
    REGISTER: "/users/register", // ✅
    VERIFY: "/users/verifyAccount", // ✅
    LOGIN: "/users/login", // ✅
    GET: "/users/me", // ✅
    LOGOUT: "/users/logout", // ✅
  },
  RIDES: {
    GET_ALL: "/rides/activeRides",
    REQUEST: "/rides/requestRide",
  },
};
