import { apiConfig } from "@/configs/apiConfig";
import { baseApi } from "../baseApi";
import { IRideFilters } from "@/types/rides.types";

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
        if (data.searchTerm) {
          queryParameters.append("searchTerm", data.searchTerm);
        }
        if (data.page) {
          queryParameters.append("page", data.page);
        }
        if (data.limit) {
          queryParameters.append("limit", data.limit);
        }
        if (data.fair) {
          queryParameters.append("fair", data.fair);
        }
        if (data.rideStatus) {
          queryParameters.append("rideStatus", data.rideStatus);
        }
        if (data.updatedAt) {
          queryParameters.append("updatedAt", data.updatedAt);
        }
        return {
          url: `${apiConfig.RIDES.MY_RIDES}?${queryParameters.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["RIDES"],
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
} = ridesApis;
