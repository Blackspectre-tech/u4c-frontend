import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Donate",
  description: "Complete your donation on United4Change.",
  path: "/in-app-donation",
  noindex: true,
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
