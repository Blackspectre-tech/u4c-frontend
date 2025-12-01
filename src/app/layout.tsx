import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Provider from "@/redux/Provider";

// "dev": "next dev --turbopack",

import "swiper/css";
import "swiper/css/navigation";
import "@/style/globals.css";
import ContextProvider from "@/Wallet/config/ContextProvider";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "United For Change",
  description:
    "United4Change is a digital donation platform that connects global donors directly to grassroots projects across Africa. Using blockchain-powered vaults and milestone-based funding, we ensure transparency, traceability, and trust.",
  openGraph: {
    title: "United For Change",
    description:
      "Rebuilding trust in giving — powered by blockchain transparency.",
    url: "https://www.adelehamzaresources.com",
    siteName: "United For Change",
    images: [
      {
        url: "/icons/u4c-logo.svg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://www.adelehamzaresources.com",
  },
  icons: {
    icon: "/icons/u4c-logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <head>
        {/* Extra meta tags not supported by Metadata API */}
        <meta
          name="keywords"
          content="digital donation platform, blockchain donations, trust-based donations, global donors, Africa grassroots projects, milestone-based funding, real-time impact tracking, blockchain-powered charity, transparent donations, decentralized giving, crypto donations, social impact funding"
        />
        <meta name="author" content="United For Change" />

        {/* External CSS */}
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider cookies={cookies}>
          <Provider>
            <ToastContainer position="bottom-right" />
            {children}
          </Provider>
        </ContextProvider>
      </body>
    </html>
  );
}
