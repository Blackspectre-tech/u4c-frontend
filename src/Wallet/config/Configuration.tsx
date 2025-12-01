// src/config/index.tsx
import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum, polygon } from "@reown/appkit/networks";

// ✅ Get your projectId from https://dashboard.reown.com
export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || "e0a435ecda03cd7e9e6785b7b4f65d04";
export const url =
  process.env.NEXT_PUBLIC_URL || "https://u4c-client-development.netlify.app";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [mainnet, polygon, arbitrum];

// ✅ Set up the Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
