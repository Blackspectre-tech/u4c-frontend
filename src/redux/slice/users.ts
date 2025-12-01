import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: Record<string, any>;
  wallet: { account: string | null; wallet_name: string | null };
  verify_email: string | null;
  online: boolean;
  organization: boolean | null;
}

const initialState: UserState = {
  user: {},
  verify_email: null,
  online: false,
  organization: null,
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
      }
    ) => {
      state.user = { ...action.payload };
    },
    setVerifyEmail: (state, action) => {
      state.verify_email = action.payload;
    },
    setOrganization: (
      state,
      action: {
        payload: boolean;
        type: string;
      }
    ) => {
      state.organization = action.payload;
    },
    setOnline: (
      state,
      action: {
        payload: boolean;
        type: string;
      }
    ) => {
      state.online = action.payload;
    },
    setWallet: (
      state,
      action: {
        payload: { account: string | null; wallet_name: string | null };
        type: string;
      }
    ) => {
      state.wallet = action.payload;
    },
    setDefault: (state, action) => initialState,
  },
});

export const {
  setUser,
  setVerifyEmail,
  setOrganization,
  setOnline,
  setWallet,
  setDefault,
} = user.actions;
// export const getToken = user.getInitialState().user;

export default user.reducer;
