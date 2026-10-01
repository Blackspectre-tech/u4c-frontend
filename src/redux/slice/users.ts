import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: Record<string, any>;
  kyc: { verified: boolean; data: Record<string, any> };
  wallet_type:
    | "embedded-wallet"
    | "smart-wallet"
    | "external-wallet"
    | "pending";
  wallet: { account: string | null; wallet_name: string | null };
  verify_email: string | null;
  refetch: boolean;
  online: boolean;
  hide_balance: boolean;
  organization: boolean | null;
}

const initialState: UserState = {
  user: {},
  online: false,
  refetch: false,
  verify_email: null,
  organization: null,
  hide_balance: false,
  wallet_type: "pending",
  kyc: { verified: false, data: {} },
  wallet: { account: null, wallet_name: null },
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: {
        payload: Record<string, any>;
        type: string;
      },
    ) => {
      state.user = { ...action.payload };
    },
    setVerifyEmail: (state, action) => {
      state.verify_email = action.payload;
    },
    setKyc: (state, action) => {
      state.kyc = action.payload;
    },
    setOrganization: (
      state,
      action: {
        payload: boolean;
        type: string;
      },
    ) => {
      state.organization = action.payload;
    },
    setRefetch: (state) => {
      state.refetch = !state.refetch;
    },
    setOnline: (
      state,
      action: {
        payload: boolean;
        type: string;
      },
    ) => {
      state.online = action.payload;
    },
    setHideBalance: (
      state,
      action: {
        payload: boolean;
        type: string;
      },
    ) => {
      state.hide_balance = action.payload;
    },
    setWallet: (
      state,
      action: {
        payload: { account: string | null; wallet_name: string | null };
        type: string;
      },
    ) => {
      state.wallet = action.payload;
    },
    setWalletType: (
      state,
      action: {
        payload:
          | "embedded-wallet"
          | "smart-wallet"
          | "external-wallet"
          | "pending";
        type: string;
      },
    ) => {
      state.wallet_type = action.payload.toLocaleLowerCase() as
        | "external-wallet"
        | "embedded-wallet"
        | "smart-wallet"
        | "pending";
    },
    setDefault: (state, action) => initialState,
  },
});

export const {
  setUser,
  setVerifyEmail,
  setOrganization,
  setHideBalance,
  setWalletType,
  setRefetch,
  setOnline,
  setWallet,
  setKyc,
  setDefault,
} = user.actions;
// export const getToken = user.getInitialState().user;

export default user.reducer;
