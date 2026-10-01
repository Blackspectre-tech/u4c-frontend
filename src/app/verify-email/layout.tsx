import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Verify Email",
  description: "Verify your email address to activate your United4Change account.",
  path: "/verify-email",
  noindex: true,
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
