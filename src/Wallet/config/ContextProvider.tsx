// src/context/index.tsx
"use client";

import React from "react";
import { wagmiAdapter, projectId, url } from "./Configuration";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { mainnet, polygon, arbitrum } from "@reown/appkit/networks";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

const queryClient = new QueryClient();

if (!projectId || !url) throw new Error("Project ID is not defined");

const metadata = {
  name: "My Dapp",
  description: "My Web3 App",
  url: url,
  icons: [
    "https://res.cloudinary.com/pinterest-site/image/upload/v1756669050/Primary-Logo_x95ovl.png",
  ],
};

// ✅ Initialize the modal
createAppKit({
  adapters: [wagmiAdapter],
  defaultNetwork: polygon,
  projectId: projectId,
  networks: [polygon],
  metadata: metadata,
  features: {
    analytics: true,
  },
});

export default function ContextProvider({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
