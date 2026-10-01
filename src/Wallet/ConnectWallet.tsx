"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoWallet } from "react-icons/io5";
import { setWallet, setWalletType } from "@/redux/slice/users";
import { RootState } from "@/redux/store";
import { useAddWalletAddressMutation } from "@/redux/api/main";
import { usePrivy } from "@privy-io/react-auth";
import { response_message } from "@/components/utilities/utils";
import ExternalWallet from "./ExternalWallet.ui";
import EmbeddedWallet from "./EmbeddedWallet.ui";
import { CHAIN_ID, useGetWallet, useLogOut } from "./privy/privy.utils";

export default function ConnectWallet({
  responsive_wind = null,
  connect_wind = "flex items-center cursor-pointer text-sm px-5 py-3",
  icon_wind = "text-[1.3rem]",
}: {
  responsive_wind?: string | null;
  connect_wind?: string;
  icon_wind?: string;
  plus_wind?: string;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [walletInfo, setWalletInfo] = useState(false);
  const { online, wallet, wallet_type } = useSelector(
    (state: RootState) => state.user,
  );

  const { login, authenticated, user, ready, logout } = usePrivy();
  const [Add_Address] = useAddWalletAddressMutation();
  const close = () => setWalletInfo((prev) => !prev);
  const { disconnect_wallet } = useLogOut();
  const use_wallet = useGetWallet();

  const isEmbedded = wallet?.wallet_name === "privy";

  const add_address = async () => {
    const wallet_name = user?.wallet?.walletClientType || "Unknown Wallet";

    if (
      authenticated &&
      user?.wallet?.address &&
      online &&
      use_wallet.address
    ) {
      const result = await Add_Address({
        params: {},
        body: { wallet_address: use_wallet?.address },
      });

      console.log("\n\n\n\n\n\n====================================");
      console.log("WALLET CONNECTED");
      console.log("WALLET CONNECTED");
      console.log(use_wallet);
      console.log(result);
      console.log("====================================\n\n\n\n\n\n");
    }

    const wallet_ = {
      account: user?.wallet?.address || null,
      wallet_name: wallet_name ?? null,
    };

    // const wallet_type_ =
    //   wallet_name != "privy"
    //     ? "external-wallet"
    //     : wallet_type === "smart-wallet"
    //       ? "smart-wallet"
    //       : "embedded-wallet";
    const wallet_type_ =
      wallet_name != "privy" ? "external-wallet" : "smart-wallet";

    // console.log("====================================");
    // console.log("REDUX CONNECTED");
    // console.log("REDUX CONNECTED");
    // console.log(wallet_);
    // console.log("====================================");

    dispatch(setWallet(wallet_));
    dispatch(setWalletType(wallet_type_));
  };

  // ✅ When connected, store in Redux + load token balances
  useEffect(() => {
    if (authenticated && user?.wallet?.address) add_address();
    const params = { account: null, wallet_name: null };

    if (!authenticated) dispatch(setWallet(params));
  }, [user?.wallet?.address, authenticated, wallet_type]);

  // ✅ When connected, store in Redux + load token balances
  useEffect(() => {
    if (authenticated && user?.wallet?.address) add_address();
  }, [wallet_type, online]);

  const open_modal = async () => {
    console.log("[ Connecting ]: ******");

    if (authenticated) {
      setIsLoading(true);

      try {
        // 1. Just call the official logout.
        // This is enough to clear the Privy session if configured correctly.
        await disconnect_wallet().finally(() => {
          setWalletInfo(false);
          setIsLoading(false);
        });
      } catch (error) {
        response_message({
          message: "Something went wrong.",
          option: "wrn",
        });
      }

      return 0;
    }

    login();
    if (authenticated && user?.wallet?.address) add_address();
  };

  // console.log("\n\n\n\n[ ***** ]");
  // console.log("Use-Wallet: ", use_wallet, "\n");
  // console.log("Use-Wallet: ", wallet_type, "\n");
  // console.log("CHAIN_ID: ", CHAIN_ID, "\n");
  // console.log("Authenticated: ", authenticated, "\n");
  // console.log("isEmbedded: ", isEmbedded, "\n");
  // console.log("wallet: ", wallet, "\n");
  // console.log("ready: ", ready, "\n");
  // console.log("wallet-Address: ", user?.wallet?.address, "\n");

  // if (!smartWallet)
  //   console.log("[ Check ]: Old EOA account kindly upgrade. \n\n");

  if (!ready) return null;

  return (
    <>
      {walletInfo &&
        (isEmbedded ? (
          <EmbeddedWallet
            address={use_wallet.address}
            open_modal={open_modal}
            is_loading={isLoading}
            close={close}
          />
        ) : (
          <ExternalWallet
            address={user?.wallet?.address as string}
            open_modal={open_modal}
            is_loading={isLoading}
            close={close}
          />
        ))}

      <div
        className={`ignore_element text-white rounded-xl text-[0.9rem] font-semibold ${
          responsive_wind ? "block md:hidden" : "hidden md:block"
        }`}
      >
        {authenticated ? (
          <div
            onClick={() => setWalletInfo((prev) => !prev)}
            className={`gradient-cto rounded-xl text-white flex items-center gap-2 cursor-pointer text-sm px-5 py-[0.65rem] ${
              responsive_wind && responsive_wind
            }`}
          >
            <IoWallet className={`text-[1.5rem]`} />
            <p className="font-bold">
              {user?.wallet?.address?.slice(0, 3)}.$
              {user?.wallet?.address?.slice(-2)}
            </p>
          </div>
        ) : (
          <button
            onClick={open_modal}
            className={`gradient-cto rounded-xl cursor-pointer ${connect_wind}`}
          >
            <IoWallet className={icon_wind} />
            {
              <>
                <p className="hidden md:block"></p>{" "}
                <p className="block md:hidden">Connect Wallet</p>
              </>
            }
          </button>
        )}
      </div>
    </>
  );
}
