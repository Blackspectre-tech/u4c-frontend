import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { setDefault } from "../slice/users";

// -------------------------------------------------------------------------------- [  ]
// ------------------------------------------------------------- [  ]
// Define success + error shapes
interface CampaignResponseSuccess {
  [key: string]: any;
}

interface CampaignResponseError {
  [key: string]: any;
}

// [  ]
type CampaignResponse = CampaignResponseSuccess | CampaignResponseError;
// ------------------------------------------------------------- [  ]
// -------------------------------------------------------------------------------- [  ]

// -------------------------------------------------------------------------------- [  ]
// -------------------------------------------------------------------------------- [  ]

export const private_endpoints = (builder: EndpointBuilder<any, any, any>) => {
  return {
    // ---------------------------------------------- [ get-popular-campaign ]
    getCampaign: builder.query<
      CampaignResponse, // ✅ response type
      { params?: Record<string, any> } | void // ✅ argument type
    >({
      query: ({ params = {} }: { params?: Record<string, any> }) => ({
        url: "/projects/my-projects/",
        method: "GET",
        params: params,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    getCampaignAwait: builder.mutation<
      CampaignResponse, // ✅ response type
      { params?: Record<string, any> } | void // ✅ argument type
    >({
      query: ({ params = {} }: { params?: Record<string, any> }) => ({
        url: "/projects/my-projects/",
        method: "GET",
        params: params,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    addWalletAddress: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
      } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
      }) => ({
        url: "/account/add-wallet/",
        method: "PATCH",
        body: body,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    patchUser: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
      } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
      }) => ({
        url: "/account/update-userprofile/",
        method: "PATCH",
        body: body,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    uploadAvatar: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
      } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
      }) => ({
        url: "/account/upload-avatar/",
        method: "PATCH",
        body: body,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    donateDonor: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      }) => ({
        url: `/projects${query}donate/`,
        method: "POST",
        body: body,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    addHash: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      }) => ({
        url: `/account/transactions/add/`,
        method: "POST",
        body: body,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    addComment: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      }) => ({
        url: `/projects${query}comments/add/`,
        method: "POST",
        body: body,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    getComment: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      }) => ({
        url: `/projects/comments${query}`,
        method: "GET",
        body: body,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    patchComment: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      }) => ({
        url: `/projects/comments${query}`,
        method: "PATCH",
        body: body,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    deleteComment: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      }) => ({
        url: `/projects/comments${query}`,
        method: "DELETE",
        body: body,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    getTransactionHistory: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
      } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
      }) => ({
        url: `/account/transactions/`,
        method: "GET",
        body: body,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    getMilestone: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      }) => ({
        url: `/projects/milestones${query}`,
        method: "GET",
        body: body,
      }),

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),
  };
};
