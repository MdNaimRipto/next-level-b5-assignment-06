import { apiConfig } from "@/configs/apiConfig";
import { baseApi } from "../baseApi";

export const userApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Register
    //
    register: builder.mutation({
      query: ({ data }) => ({
        url: apiConfig.USER.REGISTER,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data: JSON.stringify(data),
      }),
      invalidatesTags: [],
    }),
    //
    // * Login
    //
    login: builder.mutation({
      query: ({ data }: { data: { email: string; password: string } }) => ({
        url: apiConfig.USER.LOGIN,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify(data),
      }),
      invalidatesTags: ["USER"],
    }),
    //
    // * Get Info
    //
    userInfo: builder.query({
      query: () => ({
        url: apiConfig.USER.GET,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    //
    // * Logout
    //
    logout: builder.mutation({
      query: () => ({
        url: apiConfig.USER.LOGOUT,
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = userApis;
