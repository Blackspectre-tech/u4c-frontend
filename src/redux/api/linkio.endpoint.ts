import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { setDefault } from "../slice/users";

// -------------------------------------------------------------------------------- [  ]
// ------------------------------------------------------------- [  ]
// Onramp / Offramp via Linkio. The backend proxies Linkio's real API (hiding
// its keys) behind `baseurl/linkio/...`. These six endpoints and their body
// shapes come straight from what the backend dev (Steve) sent over, on
// 2026-10-07 — not yet confirmed against a live response, so:
//   - HTTP methods are a best guess: GET for the two plain lookups
//     (banks/vendors), POST for the other four, since those are described as
//     serializers validating a request body.
//   - Response shapes (what banks/vendors/rates/status actually return) are
//     unknown.
// Revisit once that's confirmed.
interface CampaignResponseSuccess {
  [key: string]: any;
}

interface CampaignResponseError {
  [key: string]: any;
}

type CampaignResponse = CampaignResponseSuccess | CampaignResponseError;
// ------------------------------------------------------------- [  ]
// -------------------------------------------------------------------------------- [  ]

export const linkio_endpoints = (builder: EndpointBuilder<any, any, any>) => {
  return {
    // ----------------------------------------------------- [ linkio-banks ]
    getLinkioBanks: builder.mutation<
      CampaignResponse,
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } = {}) => ({
        url: `/linkio/banks` + query,
        method: "GET",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: false,
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),

    // ----------------------------------------------------- [ linkio-vendors ]
    getLinkioVendors: builder.mutation<
      CampaignResponse,
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } = {}) => ({
        url: `/linkio/vendors` + query,
        method: "GET",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: false,
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),

    // ----------------------------------------------------- [ linkio-rates ]
    // body: { trx_type: "onramp" | "offramp" }
    getLinkioRates: builder.mutation<
      CampaignResponse,
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } = {}) => ({
        url: `/linkio/rates` + query,
        method: "GET",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: false,
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),

    // ----------------------------------------------------- [ linkio-onramp ]
    // body: { currency, amount, vendor_bank, vendor_number, vendor_name,
    //         wallet_address, bank_name, account_number, network, stables }
    createLinkioOnramp: builder.mutation<
      CampaignResponse,
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } = {}) => ({
        url: `/linkio/onramp` + query,
        method: "POST",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          // Confirmed 2026-10-19: onramp/offramp require a logged-in session.
          requireToken: true,
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),

    // ----------------------------------------------------- [ linkio-offramp ]
    // body: { currency, amount, wallet_address, bank_name, account_number,
    //         account_name, network, stables }
    createLinkioOfframp: builder.mutation<
      CampaignResponse,
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } = {}) => ({
        url: `/linkio/offramp` + query,
        method: "POST",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          // See the matching note on onramp above.
          requireToken: true,
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),

    // ----------------------------------------------------- [ linkio-transaction ]
    // GET only, query param: { trx_ref }. Returns the full transaction, e.g.
    // { status, message, transactions: { transaction_status, amount,
    // currency, stable, payout_amount, transaction_date, ... } }.
    // (`/linkio/payout-status/` was tried first but just returns
    // `{ status: "Fail" }` for every reference — unusable for now.)
    getLinkioTransaction: builder.mutation<
      CampaignResponse,
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } = {}) => ({
        url: `/linkio/transaction` + query,
        method: "GET",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: false,
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),

    // ----------------------------------------------------- [ linkio-transaction-history ]
    // GET, requires auth. Query params: wallet_address, transaction_type
    // ("ONRAMP" | "OFFRAMP"), status (comma-separated subset of
    // "SUCCESSFUL,PENDING,FAILED"). Confirmed 2026-10-19 from Steve, but the
    // success response shape is unconfirmed — no token available to test
    // with yet, so the frontend reads it defensively.
    getLinkioTransactionHistory: builder.mutation<
      CampaignResponse,
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } = {}) => ({
        url: `/linkio/transaction-history` + query,
        method: "GET",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: true,
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),

    // ----------------------------------------------------- [ linkio-deposit-wallets ]
    // GET, no auth. The real path is `/linkio/deposit-walets/` (that
    // spelling is correct on the backend, not a typo on our end). Returns
    // the vendor's deposit address per chain, e.g. { status, message,
    // Wallets: [{ network, address, asset }] }. Used for offramp, to know
    // where the user should send their crypto.
    getLinkioDepositWallets: builder.mutation<
      CampaignResponse,
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } = {}) => ({
        url: `/linkio/deposit-walets` + query,
        method: "GET",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: false,
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);

          if (err?.error?.data === "Axios Error") dispatch(setDefault({}));
        }
      },
    }),

    // ----------------------------------------------------- [ linkio-verify-account-number ]
    // GET, no auth. Query params: { account_number, bank_code } — bank_code
    // is the `value` field from each entry in getLinkioBanks' response.
    // Returns { status, message, data: { account_name, account_number } }.
    // Used on both onramp and offramp to confirm whose account the user is
    // paying into / being paid out to before they submit.
    getLinkioVerifyAccountNumber: builder.mutation<
      CampaignResponse,
      {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } | void
    >({
      query: ({
        params = {},
        body = {},
        query = "/",
      }: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        query?: string;
      } = {}) => ({
        url: `/linkio/verify-account-number` + query,
        method: "GET",
        body: body,
        params: params,
        extraData: {
          useMultipart: false,
          requireToken: false,
        },
      }),

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
