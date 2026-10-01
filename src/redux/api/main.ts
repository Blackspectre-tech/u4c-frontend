import { get_jwt, post_jwt } from "@/components/utilities/utils";
import { public_endpoints } from "./public.endpoint";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { jwtDecode } from "jwt-decode";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { ngo_endpoints } from "./ngo.endpoint";
import { private_endpoints } from "./private.endpoint";

// -------------------------------------------------------------------------------- [  ]
// ------------------------------------------------------------- [  ]
const URL = (
  process.env.NEXT_PUBLIC_ENVIRONMENT === "Development"
    ? process.env.NEXT_PUBLIC_DEV_API_LINK
    : process.env.NEXT_PUBLIC_PROD_API_LINK
) as string;
const axiosJwt = axios.create();

export type AxiosBaseQueryArgs = {
  url: string;
  method: AxiosRequestConfig["method"];
  body?: unknown;
  params?: unknown;
};

// Error shape for axiosBaseQuery
export type AxiosBaseQueryError = {
  status?: number;
  data?: unknown;
};

// Type for our custom baseQuery
export type AxiosBaseQuery = BaseQueryFn<
  AxiosBaseQueryArgs,
  unknown,
  AxiosBaseQueryError
>;
// ------------------------------------------------------------- [  ]
// -------------------------------------------------------------------------------- [  ]

// -------------------------------------------------------------------------------- [  ]
// -------------------------------------------------------------------------------- [  ]
axiosJwt.interceptors.request.use(async (config) => {
  let currentTime = new Date();

  try {
    const token = get_jwt("access-token");

    const decoded_token = jwtDecode<Record<string, any>>(token ? token : "");

    if (decoded_token?.exp * 1000 < currentTime?.getTime()) {
      const new_token = await axios.post(`${URL}/account/token/refresh/`, {
        refresh: get_jwt("refresh-token"),
      });

      if (new_token.data?.access) {
        config.headers["authorization"] = `Bearer ${new_token.data?.access}`;
        post_jwt({ type: "access-token", jwt: new_token.data?.access });
      } else config.headers["authorization"] = `Bearer ${token}`;
    } else config.headers["authorization"] = `Bearer ${token}`;

    return config;
  } catch (err) {
    console.log(`err:`, err);
    throw Error("Axios Error");
    // throw Error("Axios Minor Error");
  }
});

// -------------------------------------------------------------------------------- [  ]
// -------------------------------------------------------------------------------- [  ]

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): AxiosBaseQuery =>
  async ({ url, method, body, params, extraData }: any) => {
    const data = body;
    const headers = { value: { "Content-Type": "application/json" } };

    // Type Initialization
    if (extraData?.useMultipart)
      headers.value["Content-Type"] = "multipart/form-data";

    try {
      if (extraData?.requireToken === false) {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          headers: headers.value,
        });

        return { data: result.data };
      }

      const result = await axiosJwt({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: headers.value,
      });

      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// -------------------------------------------------------------------------------- [  ]
// -------------------------------------------------------------------------------- [  ]
export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: URL,
  }),
  endpoints: (builder) => ({
    ...public_endpoints(builder),
    ...private_endpoints(builder),
    ...ngo_endpoints(builder),
  }),
});

// -------------------------------------------------------------------------------- [  ]
// -------------------------------------------------------------------------------- [  ]
export const {
  // ----------------------------- [ public ]
  useGetPopularCampaignQuery,
  useGetStatsQuery,
  useGetProfileMutation,
  useSignInMutation,
  useSignUpDonorMutation,
  useSignUpNgoMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useForgotPasswordMutation,
  useEditPasswordMutation,
  useContactUsMutation,
  useAddMilestoneImagesMutation,
  useDeleteMilestoneImagesMutation,
  useAddUpdateMutation,
  useGetUpdateMutation,
  useDeleteUpdateMutation,
  useAddGalleryImagesMutation,
  useEditGalleryImageMutation,
  useDeleteGalleryImageMutation,
  useAddExpensesMutation,
  useDeleteExpensesMutation,
  useGetFaqsQuery,

  // ----------------------------- [ private ]
  useGetCampaignQuery,
  useGetCampaignAwaitMutation,
  useAddWalletAddressMutation,
  usePatchUserMutation,
  useUploadAvatarMutation,
  useDonateDonorMutation,
  useAddHashMutation,
  useAddCommentMutation,
  useGetCommentMutation,
  usePatchCommentMutation,
  useDeleteCommentMutation,
  useGetTransactionHistoryMutation,
  useGetMilestoneMutation,

  // ----------------------------- [ public ]
  useGetNgoMutation,
  usePatchNgoMutation,
  useVerifyKycMutation,
  useGetKycMutation,
  useCreateCampaignMutation,
  useDeleteCampaignMutation,
  usePatchCampaignMutation,
  useGetCampaignNgoMutation,
  useGetNgoPublicMutation,
  useGetNgoCampaignMutation,
  useGetDonationsMutation,
  useGetCommentsMutation,
} = api;
