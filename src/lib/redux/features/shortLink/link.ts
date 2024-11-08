import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the Link API
export const LinkAPI = createApi({
  reducerPath: "link_api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT }),
  endpoints: (build) => ({
    // Mutation to create a short URL
    create_shortURL: build.mutation({
      query: ({ originalUrl }) => ({
        url: "/api/link/new-gen",
        method: "POST",
        body: { originalUrl },
        headers: { "Content-Type": "application/json" },
      }),
    }),

    // Endpoint to listen for verification status via SSE
    listenVerificationStatus: build.query({
      queryFn: async (verificationId) => {
        return new Promise((resolve, reject) => {
          const eventSource = new EventSource(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/link/verify-status/${verificationId}`
          );

          // Handle each SSE message
          eventSource.onmessage = (event) => {
            try {
              const statusData = JSON.parse(event.data);
              if (statusData.status === "completed") {
                eventSource.close();
                resolve({ data: statusData });
              }
              // Optionally, handle other statuses if needed
              else {
                // Resolve with status update if you need to display it
                resolve({ data: statusData });
              }
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_err) {
              eventSource.close();
              reject({ error: "Failed to parse SSE message" });
            }
          };

          // Handle errors
          eventSource.onerror = () => {
            eventSource.close();
            reject({ error: "SSE connection error" });
          };
        });
      },
    }),
  }),
});

export const { useCreate_shortURLMutation, useListenVerificationStatusQuery } =
  LinkAPI;

interface LinkState {
  link: string;
}

const initialState: LinkState = {
  link: "",
};

// Create the slice
const LinkSlice = createSlice({
  name: "Link_slice",
  initialState,
  reducers: {
    addLink(state, action: PayloadAction<string>) {
      console.log(action.payload)
      state.link = action.payload; 
    },
  },
});
export const { addLink } = LinkSlice.actions;
export default LinkSlice.reducer;
