import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Campaign",
  description:
    "Support a verified United4Change campaign. Track milestones, see how funds are released, and follow the real-world impact of your donation on-chain.",
  path: "/campaign",
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
