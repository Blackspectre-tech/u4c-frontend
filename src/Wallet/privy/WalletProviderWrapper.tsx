// src/components/WalletProviderWrapper.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";
import Provider from "@/redux/Provider";
import { ToastContainer } from "react-toastify";

// We still keep dynamic import to ensure the Privy SDK
// only loads on the client side (preventing "window is not defined" errors)
const DynamicContextProvider = dynamic(() => import("@/Wallet/privy/Index"), {
  ssr: false,
});

export default function WalletProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      {/* Notice: No 'cookies' prop needed for Privy.
          The 'Wallet/Index' component will now contain your PrivyProvider.
      */}
      <DynamicContextProvider>
        <ToastContainer position="bottom-right" />
        {children}
      </DynamicContextProvider>
    </Provider>
  );
}
