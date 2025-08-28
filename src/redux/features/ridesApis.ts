import { apiConfig } from "@/configs/apiConfig";
import { baseApi } from "../baseApi";
import { EarningFilter, IRideFilters } from "@/types/rides.types";

export const ridesApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Get active rides
    //
    getActiveRides: builder.query({
      query: () => ({
        url: apiConfig.RIDES.GET_ALL,
        method: "GET",
      }),
      providesTags: ["RIDES"],
    }),
    //
    // * Request Ride
    //
    requestRide: builder.mutation({
      query: ({ data }) => ({
        url: apiConfig.RIDES.REQUEST,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data: JSON.stringify(data),
      }),
      invalidatesTags: ["RIDES"],
    }),
    //
    // * Get my rides
    //
    getMyRides: builder.query({
      query: (data: IRideFilters) => {
        const queryParameters = new URLSearchParams();

        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            queryParameters.append(key, String(value));
          }
        });

        // if (data.searchTerm) {
        //   queryParameters.append("searchTerm", data.searchTerm);
        // }
        // if (data.page) {
        //   queryParameters.append("page", data.page);
        // }
        // if (data.limit) {
        //   queryParameters.append("limit", data.limit);
        // }
        // if (data.fair) {
        //   queryParameters.append("fair", data.fair);
        // }
        // if (data.rideStatus) {
        //   queryParameters.append("rideStatus", data.rideStatus);
        // }
        // if (data.updatedAt) {
        //   queryParameters.append("updatedAt", data.updatedAt);
        // }
        return {
          url: `${apiConfig.RIDES.MY_RIDES}?${queryParameters.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["RIDES"],
    }),
    //
    // * Get my rides
    //
    getEarningHistory: builder.query({
      query: (filter: EarningFilter) => {
        console.log({ filter });
        return {
          url: `${apiConfig.RIDES.GET_EARNING_HISTORY}?filter=${filter}`,
          method: "GET",
        };
      },
      providesTags: [],
    }),
    //
    // * Update Ride Accept Status
    //
    updateRideAcceptStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: apiConfig.RIDES.UPDATE_ACCEPT_STATUS + `/${id}`,
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        data: JSON.stringify(data),
      }),
      invalidatesTags: ["RIDES"],
    }),
    //
    // * Update Ride Accept Status
    //
    updateRideStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: apiConfig.RIDES.UPDATE_STATUS + `/${id}`,
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        data: JSON.stringify(data),
      }),
      invalidatesTags: ["RIDES"],
    }),
  }),
});

export const {
  useGetActiveRidesQuery,
  useRequestRideMutation,
  useGetMyRidesQuery,
  useUpdateRideAcceptStatusMutation,
  useUpdateRideStatusMutation,
  useGetEarningHistoryQuery,
} = ridesApis;
