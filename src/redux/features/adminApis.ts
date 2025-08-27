import { apiConfig } from "@/configs/apiConfig";
import { baseApi } from "../baseApi";

export const adminApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Get Users
    //
    getAllUsers: builder.query({
      query: () => ({
        url: apiConfig.ADMIN.GET_USERS,
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),
    //
    // * Get Rides
    //
    getAllURides: builder.query({
      query: () => ({
        url: apiConfig.ADMIN.GET_RIDES,
        method: "GET",
      }),
      providesTags: [],
    }),
    //
    // * Block/Unblock User
    //
    updateBlockStatus: builder.mutation({
      query: ({ id }) => ({
        url: apiConfig.ADMIN.UPDATE_BLOCK_STATUS + `/${id}`,
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["ADMIN"],
    }),
  }),
});

export const {
  useGetAllURidesQuery,
  useGetAllUsersQuery,
  useUpdateBlockStatusMutation,
} = adminApis;
