import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Forgot Password",
  description: "Reset the password for your United4Change account.",
  path: "/forgot-password",
  noindex: true,
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
