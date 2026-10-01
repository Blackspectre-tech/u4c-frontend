"use client";

import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import { PrivyProvider } from "@privy-io/react-auth";
import { polygon, polygonAmoy } from "viem/chains";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const TEST_NET = process.env.NEXT_PUBLIC_NETWORK === "Test-Net";
  const ALCHEMY_URL = String(
    TEST_NET
      ? process.env.NEXT_PUBLIC_ALCHEMY_TESTNET_KEY
      : process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_KEY,
  );

  // Define your RPC URL and Chain
  const activeChain = TEST_NET ? polygonAmoy : polygon;
  const ALCHEMY_WSS_URL = ALCHEMY_URL.replace("https://", "wss://");

  const Custom_Chain = {
    ...activeChain,
    rpcUrls: {
      ...activeChain.rpcUrls,
      default: {
        http: [ALCHEMY_URL],
        webSocket: [ALCHEMY_WSS_URL], // 👈 This enables the "hot" connection
      },
      public: { http: [ALCHEMY_URL] },
    },
  };

  // Create a modified chain object that includes your custom RPC
  // const Custom_Chain = {
  //   ...activeChain,
  //   rpcUrls: {
  //     ...activeChain.rpcUrls,
  //     default: { http: [ALCHEMY_URL] },
  //     public: { http: [ALCHEMY_URL] },
  //   },
  // };

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PROJECT_ID as string}
      config={{
        // 1. [  ]
        defaultChain: Custom_Chain,
        supportedChains: [Custom_Chain],

        // 2. [  ]
        appearance: {
          theme: "light",
          accentColor: "#000000",
          logo: "https://res.cloudinary.com/dzkcbkmmm/image/upload/v1773308282/u4c-512x512_xs7mop.png",
          walletList: [
            "metamask",
            "rainbow",
            "phantom",
            "coinbase_wallet",
            "wallet_connect",
          ],
          showWalletLoginFirst: true,
        },

        // 3. [  ]
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
          showWalletUIs: true,
          // requireUserPasswordOnCreate: false,
        },

        // 4. [  ]
        loginMethods: ["wallet", "email", "google"],

        // 5. [  ]
        externalWallets: {
          walletConnect: {
            enabled: true, // This enables WalletConnect support
            // Note: Privy now handles the QR code logic automatically based on the device
          },
        },
      }}
    >
      <SmartWalletsProvider>{children}</SmartWalletsProvider>
    </PrivyProvider>
  );
}
