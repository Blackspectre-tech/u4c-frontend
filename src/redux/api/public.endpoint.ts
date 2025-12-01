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

export const public_endpoints = (builder: EndpointBuilder<any, any, any>) => {
  return {
    // ---------------------------------------------- [ get-popular-campaign ]
    getPopularCampaign: builder.query<
      CampaignResponse, // ✅ response type
      { params?: Record<string, any>; query?: string } | void // ✅ argument type
    >({
      query: ({
        params = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        query?: string;
      }) => ({
        url: "/projects" + query,
        method: "GET",
        params: params,
      }),
    }),

    // ---------------------------------------------- [ get-profile ]
    getProfileBackgroundTask: builder.query<
      CampaignResponse, // ✅ response type
      { params?: Record<string, any> } | void // ✅ argument type
    >({
      query: ({ params = {} }: { params?: Record<string, any> }) => ({
        url: "/account/my-profile/",
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

    // ---------------------------------------------- [ get-profile ]
    getProfile: builder.mutation<
      CampaignResponse, // ✅ response type
      { params?: Record<string, any> } | void // ✅ argument type
    >({
      query: ({ params = {} }: { params?: Record<string, any> }) => ({
        url: "/account/my-profile/",
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

    // ---------------------------------------------- [ get-profile ]
    getFaqs: builder.query<
      CampaignResponse, // ✅ response type
      { params?: Record<string, any> } | void // ✅ argument type
    >({
      query: ({ params = {} }: { params?: Record<string, any> }) => ({
        url: "/website/faq/",
        method: "GET",
        params: params,
      }),
    }),

    // ----------------------------------------------------- [ sign-in ]
    signIn: builder.mutation<
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
        url: "/account/token/",
        method: "POST",
        body: body,
        params: params,
      }),
    }),

    // ----------------------------------------------------- [ sign-up-donor ]
    signUpDonor: builder.mutation<
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
        url: "/account/register-user/",
        method: "POST",
        body: body,
        params: params,
      }),
    }),

    // ----------------------------------------------------- [ sign-up-ngo ]
    signUpNgo: builder.mutation<
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
        url: "/account/register-organization/",
        method: "POST",
        body: body,
        params: params,
      }),
    }),

    // ----------------------------------------------------- [ verify-email ]
    verifyEmail: builder.mutation<
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
        url: "/account/activate/",
        method: "POST",
        body: body,
        params: params,
      }),
    }),

    // ----------------------------------------------------- [ resend-verification ]
    resendVerification: builder.mutation<
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
        url: "/account/resend-activation-otp/",
        method: "POST",
        body: body,
        params: params,
      }),
    }),

    // ----------------------------------------------------- [ forgot-password ]
    forgotPassword: builder.mutation<
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
        url: "/account/password-reset/",
        method: "POST",
        body: body,
        params: params,
      }),
    }),

    // ----------------------------------------------------- [ forgot-password ]
    editPassword: builder.mutation<
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
        url: "/account/confirm-password-reset/",
        method: "POST",
        body: body,
        params: params,
      }),
    }),

    // ----------------------------------------------------- [ forgot-password ]
    contactUs: builder.mutation<
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
        url: "/website/contact-us/",
        method: "POST",
        body: body,
        params: params,
      }),
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    getNgoPublic: builder.mutation<
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
        // url: `/projects/${query}/comments/add/`,
        url: `/account/organization` + query,
        method: "GET",
        body: body,
      }),
    }),
    // ---------------------------------------------- [ get-popular-campaign ]
    getNgoCampaign: builder.mutation<
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
        url: `/projects/organization` + query,
        method: "GET",
        body: body,
      }),
    }),
  };
};
