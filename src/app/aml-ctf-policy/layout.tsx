import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AML / CTF Policy",
  description:
    "United4Change's Anti-Money Laundering and Counter-Terrorism Financing policy, outlining how we keep donations on our platform safe and compliant.",
  path: "/aml-ctf-policy",
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
