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

export const ngo_endpoints = (builder: EndpointBuilder<any, any, any>) => {
  return {
    // ----------------------------------------------------- [ sign-in ]
    getNgo: builder.mutation<
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
        url: "/account/organization" + query,
        method: "GET",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    patchNgo: builder.mutation<
      CampaignResponse, // ✅ response type
      { params?: Record<string, any>; body?: Record<string, any> } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
      }) => ({
        url: "/account/update-organization/",
        method: "PATCH",
        body: body,
        params: params,
        extraData: {
          useMultipart: true,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    getKyc: builder.mutation<
      CampaignResponse, // ✅ response type
      { params?: Record<string, any>; body?: Record<string, any> } | void // ✅ argument type
    >({
      query: ({ params = {} }: { params?: Record<string, any> }) => ({
        url: "/account/organization/kyc/",
        method: "GET",
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    verifyKyc: builder.mutation<
      CampaignResponse, // ✅ response type
      { params?: Record<string, any>; body?: Record<string, any> } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
      }) => ({
        url: "/account/organization/kyc/",
        method: "PATCH",
        body: body,
        params: params,
        extraData: {
          useMultipart: true,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    createCampaign: builder.mutation<
      CampaignResponse, // ✅ response type
      { params?: Record<string, any>; body?: Record<string, any> } | void // ✅ argument type
    >({
      query: ({
        params = {},
        body = {},
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
      }) => ({
        url: "/projects/create/",
        method: "POST",
        body: body,
        params: params,
        extraData: {
          useMultipart: true,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    deleteCampaign: builder.mutation<
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
        url: "/projects" + query,
        method: "DELETE",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    patchCampaign: builder.mutation<
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
        url: "/projects" + query,
        method: "PATCH",
        body: body,
        params: params,
        extraData: {
          useMultipart: true,
          requireToken: true,
        },
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

    // ----------------------------------------------------- [ sign-in ]
    addMilestoneImages: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      },
      void // ✅ argument type
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
        url: `/projects/milestones${query}post-images/`,
        method: "POST",
        body: body,
        params: params,
        extraData: {
          useMultipart: true,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    deleteMilestoneImages: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      },
      void // ✅ argument type
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
        url: `/projects/milestones/images${query}`,
        method: "DELETE",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    addGalleryImages: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      },
      void // ✅ argument type
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
        url: `/projects/milestones${query}post-images/`,
        method: "POST",
        body: body,
        params: params,
        extraData: {
          useMultipart: true,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    editGalleryImage: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      },
      void // ✅ argument type
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
        url: `/projects/milestones/images${query}`,
        method: "PATCH",
        body: body,
        params: params,
        extraData: {
          useMultipart: true,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    deleteGalleryImage: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      },
      void // ✅ argument type
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
        url: `/projects/milestones/images${query}`,
        method: "DELETE",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    addUpdate: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      },
      void // ✅ argument type
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
        url: `/projects${query}post-update/`,
        method: "POST",
        body: body,
        params: params,
        extraData: {
          useMultipart: true,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    getUpdate: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      },
      void // ✅ argument type
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
        url: `/projects${query}updates/`,
        method: "GET",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    deleteUpdate: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      },
      void // ✅ argument type
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
        url: `/projects/updates${query}`,
        method: "DELETE",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    addExpenses: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      },
      void // ✅ argument type
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
        url: `/projects/milestones${query}add-expenses/`,
        method: "POST",
        body: body,
        params: params,
        extraData: {
          useMultipart: true,
          requireToken: true,
        },
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
    // ----------------------------------------------------- [ sign-in ]
    deleteExpenses: builder.mutation<
      CampaignResponse, // ✅ response type
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      },
      void // ✅ argument type
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
        url: `/projects/expenses${query}`,
        method: "DELETE",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: true,
        },
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
