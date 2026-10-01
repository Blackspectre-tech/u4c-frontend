"use client";

import Lenis from "lenis"; // updated import
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
// import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

// ✅ Define DynamicNav within the client component scope
const DynamicNav = dynamic(() => import("@/components/Nav"), {
  ssr: false, // Prevents Nav from being processed during the server build
});

const Template = ({ children }: { children: React.ReactNode }) => {
  const currentPath = usePathname();

  return (
    <div
      className={`relative ${
        currentPath.includes("dashboard") ? "" : "max-w-450 mx-auto"
      }`}
    >
      <div className="relative z-10">
        {!currentPath.includes("dashboard") && (
          <DynamicNav isDashboard={currentPath.includes("dashboard")} />
        )}
        {children}
        {!currentPath.includes("dashboard") && (
          <Footer
            onboarding={
              currentPath.includes("sign-up")
                ? true
                : currentPath.includes("sign-in")
                  ? true
                  : currentPath.includes("verify-email")
                    ? true
                    : currentPath.includes("forgot-password")
                      ? true
                      : currentPath.includes("edit-password")
                        ? true
                        : currentPath.includes("initialize-campaign")
                          ? true
                          : false
            }
          />
        )}
      </div>
    </div>
  );
};

export default Template;
