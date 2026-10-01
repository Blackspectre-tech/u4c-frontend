import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Start a Campaign",
  description: "Launch your fundraising campaign on United4Change.",
  path: "/initialize-campaign",
  noindex: true,
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
