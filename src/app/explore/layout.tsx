import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Explore Campaigns",
  description:
    "Browse verified grassroots campaigns across Africa. Fund real impact with milestone-based, blockchain-tracked donations you can follow from gift to outcome.",
  path: "/explore",
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
