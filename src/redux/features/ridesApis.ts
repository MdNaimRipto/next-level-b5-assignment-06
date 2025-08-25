import { apiConfig } from "@/configs/apiConfig";
import { baseApi } from "../baseApi";

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
      providesTags: [],
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
      invalidatesTags: [],
    }),
  }),
});

export const { useGetActiveRidesQuery, useRequestRideMutation } = ridesApis;
