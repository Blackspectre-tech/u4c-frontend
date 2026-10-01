import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sign In",
  description: "Sign in to your United4Change account.",
  path: "/sign-in",
  noindex: true,
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
