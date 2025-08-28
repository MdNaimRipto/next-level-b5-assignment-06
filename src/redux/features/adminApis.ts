import { apiConfig } from "@/configs/apiConfig";
import { baseApi } from "../baseApi";
import { IUserFilters } from "@/types/userTypes";
import { EarningFilter } from "@/types/rides.types";

export const adminApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Get Users
    //
    getAllUsers: builder.query({
      query: (data: IUserFilters) => {
        const queryParameters = new URLSearchParams();

        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            queryParameters.append(key, String(value));
          }
        });
        return {
          url: `${apiConfig.ADMIN.GET_USERS}?${queryParameters.toString()}`,
          method: "GET",
        };
      },
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
    //
    // * Approve/Suspend User
    //
    updateApproveStatus: builder.mutation({
      query: ({ id }) => ({
        url: apiConfig.ADMIN.UPDATE_APPROVE_STATUS + `/${id}`,
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["ADMIN"],
    }),
    //
    // * Get my rides
    //
    getAnalytics: builder.query({
      query: (filter: EarningFilter) => {
        console.log({ filter });
        return {
          url: `${apiConfig.ADMIN.ANALYTICS}?filter=${filter}`,
          method: "GET",
        };
      },
      providesTags: [],
    }),
  }),
});

export const {
  useGetAllURidesQuery,
  useGetAllUsersQuery,
  useUpdateBlockStatusMutation,
  useUpdateApproveStatusMutation,
  useGetAnalyticsQuery,
} = adminApis;
