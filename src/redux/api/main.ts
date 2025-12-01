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
const URL = "https://backend.united-4-change.org";
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

    console.log("========== [ TOKEN NEEDED ] ============");
    console.log(decoded_token);
    console.log(token);
    console.log("====================================");

    if (decoded_token?.exp * 1000 < currentTime?.getTime()) {
      const new_token = await axios.post(`${URL}/account/token/refresh/`, {
        refresh: get_jwt("refresh-token"),
      });

      console.log("[ New Token ]", new_token.data);

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
function check_path(path: string, method: string | undefined) {
  // Matches:
  //   /projects/123
  //   /projects/123/
  //   /projects/organization/4
  //   /projects/organization/4/
  const regex = /^\/projects(?:\/organization)?\/\d+\/?$/;

  const result = regex.test(path);

  console.log("========== [ check_path ] ==========");
  console.log("Path:", path);
  console.log("Regex Match:", result);
  console.log("====================================");

  return result && method === "GET";
}

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): AxiosBaseQuery =>
  async ({ url, method, body, params }) => {
    const data = body;
    const headers = { value: { "Content-Type": "application/json" } };

    if (
      url === "/projects/create/" ||
      url === "/account/upload-avatar/" ||
      url === "/account/organization/kyc/" ||
      url === "/account/update-userprofile/" ||
      url === "/account/update-organization/" ||
      (url.includes("/projects/") === true && method === "PATCH") ||
      (url.includes("/projects/milestones/") === true && method === "POST")
    )
      headers.value["Content-Type"] = "multipart/form-data";

    console.log("000000000000000000000000000000000000");
    console.log(headers);
    console.log(url);
    console.log(params);
    console.log(method);
    console.log("000000000000000000000000000000000000");

    try {
      if (
        url === "/projects/" ||
        url === "/website/faq/" ||
        url === "/account/token/" ||
        url === "/account/activate/" ||
        url === "/website/contact-us/" ||
        url === "/account/organization/" ||
        url === "/account/organization/" ||
        check_path(url, method) === true ||
        url === "/account/register-user/" ||
        url === "/account/password-reset/" ||
        url === "/account/register-organization/" ||
        url === "/account/resend-activation-otp/" ||
        url === "/account/confirm-password-reset/"
      ) {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          headers: headers.value,
        });

        console.log("====================================");
        console.log("[ NO TOKEN NEEDED ]");
        console.log("====================================");

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
  useGetProfileMutation,
  useGetProfileBackgroundTaskQuery,
  useSignInMutation,
  useSignUpDonorMutation,
  useSignUpNgoMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useForgotPasswordMutation,
  useEditPasswordMutation,
  useContactUsMutation,
  useAddMilestoneImagesMutation,
  useAddExpensesMutation,
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
  useCreateCampaignMutation,
  useDeleteCampaignMutation,
  usePatchCampaignMutation,
  useGetCampaignNgoMutation,
  useGetNgoPublicMutation,
  useGetNgoCampaignMutation,
} = api;
