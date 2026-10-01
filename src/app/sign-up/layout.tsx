import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Create an Account",
  description: "Create a United4Change account to donate or launch a campaign.",
  path: "/sign-up",
  noindex: true,
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
