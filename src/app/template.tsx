"use client";

import Lenis from "lenis"; // updated import
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Template = ({ children }: { children: React.ReactNode }) => {
  const currentPath = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // replaces smoothTouch in new API
      touchMultiplier: 2, // replaces touchMultiplier
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    let frameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);
    const gsap_video = gsap.context((context) => {});
    gsap_video.add("init_animation", () => {
      gsap.utils
        .toArray<HTMLElement>(".scroll_effect_parent_")
        .forEach((parent) => {
          // const children = gsap.utils.toArray<HTMLElement>(
          //   ".scroll_effect_child_"
          // );
          const children = parent.querySelectorAll(".scroll_effect_child_");

          // console.log("====================================");
          // console.log(parent);
          // console.log(children);
          // console.log("====================================");

          gsap.to(children, {
            y: 0,
            stagger: 0.1,

            scrollTrigger: {
              id: `ref_video`,
              trigger: parent,
              start: "clamp(top top+=100%)",
              endTrigger: parent,
              end: "clamp(bottom bottom-=100%)",
              scrub: 1,
              // markers: true,
            },
          });
        });
    });

    gsap_video.init_animation();
    console.log("====================================");
    console.log(currentPath);
    console.log("====================================");

    return () => {
      gsap_video.revert();
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [currentPath]);

  return (
    <div
      className={`relative ${
        currentPath.includes("dashboard") ? "" : "max-w-[1800] mx-auto"
      }`}
    >
      <div className="relative z-10">
        {<Nav isDashboard={currentPath.includes("dashboard")} />}
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
