import { apiConfig } from "@/configs/apiConfig";
import { baseApi } from "../baseApi";

export const sosApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Request SOS
    //
    requestSos: builder.mutation({
      query: ({ data }) => ({
        url: apiConfig.SOS.REQUEST,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data: JSON.stringify(data),
      }),
      invalidatesTags: ["SOS"],
    }),
    //
    // * Get sos
    //
    getSos: builder.query({
      query: ({ id }) => ({
        url: apiConfig.SOS.GET + `/${id}`,
        method: "GET",
      }),
      providesTags: ["SOS"],
    }),
    //
    // * Update sos Status
    //
    updateSosState: builder.mutation({
      query: ({ id }) => ({
        url: apiConfig.SOS.UPDATE + `/${id}`,
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["SOS"],
    }),
  }),
});

export const {
  useRequestSosMutation,
  useGetSosQuery,
  useUpdateSosStateMutation,
} = sosApis;
