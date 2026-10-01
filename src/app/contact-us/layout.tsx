import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the United4Change team. Questions about donating, running a campaign, or our blockchain-based transparency? We're here to help.",
  path: "/contact-us",
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
