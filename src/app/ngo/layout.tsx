import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "For NGOs — Raise Funds Transparently",
  description:
    "United4Change gives NGOs blockchain-powered vaults and milestone-based funding to build donor trust and receive donations globally, with every release verified.",
  path: "/ngo",
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
