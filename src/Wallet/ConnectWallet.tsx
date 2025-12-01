"use client";

import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useAppKit } from "./reown/Index";
import { useDispatch, useSelector } from "react-redux";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { IoWallet } from "react-icons/io5";
import { setWallet } from "@/redux/slice/users";
import { RootState } from "@/redux/store";
import { useAddWalletAddressMutation } from "@/redux/api/main";
import { TiPlus } from "react-icons/ti";

// Polygon mainnet USDT + USDC
const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
const USDC_ADDRESS = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";

export default function ConnectWallet({
  responsive_wind = "button_ text-white rounded-md text-[0.9rem] font-semibold hidden md:block",
  connect_wind = "flex items-center gap-2 cursor-pointer text-sm px-5 py-3",
  icon_wind = "text-[1.3rem]",
  plus_wind = "text-[0.7rem] ml-1",
}: {
  responsive_wind?: string;
  connect_wind?: string;
  icon_wind?: string;
  plus_wind?: string;
}) {
  const dispatch = useDispatch();
  const { online } = useSelector((state: RootState) => state.user);

  const { address, isConnected, connector } = useAccount();
  const app_kit = useAppKit();

  const [Add_Address] = useAddWalletAddressMutation();

  const add_address = async () => {
    if (isConnected && address && online) {
      const result = await Add_Address({
        params: {},
        body: { wallet_address: address },
      });

      console.log("====================================");
      console.log("WALLET CONNECTED");
      console.log("WALLET CONNECTED");
      console.log(result);
      console.log("====================================");
    }

    const wallet_ = {
      account: address || null,
      wallet_name: connector?.name ?? null,
    };

    console.log("====================================");
    console.log("REDUX CONNECTED");
    console.log("REDUX CONNECTED");
    console.log(wallet_);
    console.log("====================================");

    dispatch(setWallet(wallet_));
  };

  // ✅ When connected, store in Redux + load token balances
  useEffect(() => {
    if (isConnected && address) add_address();

    if (!isConnected) {
      console.log("====================================");
      console.log("REDUX DISCONNECT");
      console.log("REDUX DISCONNECT");
      console.log("====================================");

      dispatch(setWallet({ account: null, wallet_name: null }));
    }
  }, [address, isConnected]);

  const open_modal = async () => {
    if (!app_kit) return null;
    const { open } = app_kit; // ✅ AppKit modal

    await open();
    if (isConnected && address) add_address();
  };

  const big_wallet = `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  const small_wallet = `${address?.slice(0, 2)}.${address?.slice(-1)}`;

  return (
    <div className={`${responsive_wind}`}>
      {isConnected ? (
        <div onClick={open_modal} id="wallet" className={connect_wind}>
          <PiPlugsConnectedFill className={`${icon_wind}`} />
          <p>
            {online === true ? (
              big_wallet
            ) : (
              <>
                <span className="hidden md:block">{small_wallet}</span>
                <span className="block md:hidden">{big_wallet}</span>
              </>
            )}
          </p>
          <TiPlus
            className={`${plus_wind} mt-[1px] ${
              online === false && "md:translate-x-[-10px]"
            }`}
          />
        </div>
      ) : (
        <button
          onClick={open_modal}
          className={`${
            online === false
              ? "flex items-center gap-0 cursor-pointer text-sm px-5 py-3"
              : connect_wind
          }`}
        >
          <IoWallet className={icon_wind} />
          {online === true ? (
            "Connect Wallet"
          ) : (
            <>
              <p className="hidden md:block"></p>{" "}
              <p className="block md:hidden">Connect Wallet</p>
            </>
          )}
        </button>
      )}
    </div>
  );
}
