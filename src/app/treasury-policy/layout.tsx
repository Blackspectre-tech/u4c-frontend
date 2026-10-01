import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Treasury Policy",
  description:
    "How United4Change manages, secures, and releases funds held in blockchain-powered vaults under milestone-based funding.",
  path: "/treasury-policy",
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
