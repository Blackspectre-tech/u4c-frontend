import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How United4Change collects, uses, and protects your personal data when you donate to or run campaigns on our platform.",
  path: "/privacy-policy",
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
