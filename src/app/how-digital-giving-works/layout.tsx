import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How Digital Giving Works",
  description:
    "See how United4Change uses blockchain vaults and milestone-based funding to make every donation traceable — from donor to verified real-world impact.",
  path: "/how-digital-giving-works",
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
