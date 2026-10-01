import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Reset Password",
  description: "Set a new password for your United4Change account.",
  path: "/edit-password",
  noindex: true,
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
