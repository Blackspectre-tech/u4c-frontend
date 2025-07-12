import { createAppKit } from "@reown/appkit/react";
import { injected } from "wagmi/connectors";

import { WagmiProvider } from "wagmi";
import { arbitrum, holesky, mainnet, sepolia } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const queryClient = new QueryClient();

const projectId =
  import.meta.env.VITE_PROJECTID || "b56e18d47c72ab683b10814fe9495694";

const url = import.meta.env.DEV
  ? "http://localhost:5173"
  : "https://united-4-change.com";
const metadata = {
  name: "Sharki",
  description: "AppKit Example",
  url: url,
  icons: ["assets/img/logo.png"],
};
const networks = [mainnet, arbitrum, sepolia, holesky];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  connectors: [injected()],
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  themeMode: "light",
  metadata,
  features: {
    analytics: true,
  },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
