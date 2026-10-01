"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaSquareInstagram, FaSquarePhoneFlip } from "react-icons/fa6";
import { MdEmail, MdFacebook } from "react-icons/md";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaTelegram,
} from "react-icons/fa";

function Footer({ onboarding = false }: { onboarding?: boolean }) {
  const currentPath = usePathname();

  return (
    <div className={`${currentPath === "/" && "bg-white"} p-5 sm:px-20 mt-20`}>
      <div className="gradient-cto-two flex flex-col items-center rounded-4xl text-white p-10">
        <div className="flex items-center mb-8">
          <div className="w-20 h-20 bg-amber-100 border-2 border-white rounded-full translate-x-2 relative overflow-hidden">
            <Image
              src={"/icons/img-0.jpeg"}
              alt=""
              className="w-full h-full object-cover object-top"
              fill
            />
          </div>
          <div className="w-24 h-24 bg-amber-100 border-2 border-white rounded-full relative z-10 overflow-hidden">
            <Image
              src={"/icons/img-1.jpeg"}
              alt=""
              className="w-full h-full object-cover object-top"
              fill
            />
          </div>
          <div className="w-20 h-20 bg-amber-100 border-2 border-white rounded-full -translate-x-2 relative overflow-hidden">
            <Image
              src={"/icons/img-2.jpeg"}
              alt=""
              className="w-full h-full object-cover object-top"
              fill
            />
          </div>
        </div>

        <h1 className="text-3xl text-center font-bold">
          Still have questions?
        </h1>
        <p className="lg:w-[80%] xl:w-[50%] text-center mt-5">
          Didn‘t find what you were looking for? Our team is here to help. Reach
          out to us with your questions or concerns, and we‘ll get back to you
          promptly
        </p>

        <Link href={"/contact-us"}>
          <button
            className={`border border-white px-8 py-3 hover:bg-[#ffffff17] cursor-pointer font-semibold rounded-lg mt-5`}
          >
            Get In Touch
          </button>
        </Link>
      </div>

      {onboarding === false && (
        <div className="flex flex-col min-[500px]:grid grid-cols-12 gap-10 md:gap-5 mt-20">
          <div className="col-span-12 min-[900px]:col-span-6 min-[1200px]:col-span-3">
            <div className="flex items-center gap-10 mb-4">
              <Link href={"https://black-spectre.com/"} target="_blank">
                <Image
                  src={"/icons/black-spectra.jpg"}
                  className="min-w-20"
                  alt=""
                  width={80}
                  height={80}
                />
              </Link>
              <Image
                src={"/icons/u4c-logo.svg"}
                className="min-w-[3.6rem]"
                alt=""
                width={55}
                height={55}
              />
              <Link
                href={"https://impactbridgefoundation.org/"}
                target="_blank"
              >
                <Image
                  src={"/icons/IMPACT ORIGINAL LOGO.svg"}
                  className="min-w-16"
                  alt=""
                  width={70}
                  height={70}
                />
              </Link>
            </div>

            <p>
              <span className="font-semibold">
                Trusted & Compliant by Design
              </span>{" "}
              All donations flow via smart contracts to verified NGOs and are
              fully compliant with global AML and counter-terrorist financing
              standards.
            </p>
          </div>

          <div className="col-span-4 min-[900px]:col-span-3">
            <div className="min-[1200px]:flex flex-col items-start md:items-end lg:items-center">
              <div className="">
                <h1 className="font-semibold text-xl">Get Involved</h1>
                <div className="flex flex-col gap-2 mt-5 capitalize">
                  <Link href="/explore">Explore Projects</Link>
                  <Link href="/contact-us">Book a Demo</Link>
                  {/* <p>Completed Projects</p> */}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 min-[900px]:col-span-3">
            <div className="min-[1200px]:flex flex-col items-start md:items-start lg:items-center">
              <div className="">
                <h1 className="font-semibold text-xl">Quick Links</h1>

                <div className="flex flex-col gap-2 capitalize mt-5">
                  <Link href="/privacy-policy">privacy policy</Link>
                  {/* <Link href="/terms-and-conditions">terms and conditions</Link> */}
                  <Link href="/terms-of-use">terms of use</Link>
                  <Link href="/treasury-policy">treasury-policy</Link>
                  <Link href="/aml-ctf-policy">AML-CTF policy</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 min-[900px]:col-span-5 min-[1200px]:col-span-3">
            <div className="min-[1200px]:flex flex-col items-start md:items-end lg:items-start">
              <div className="">
                <h1 className="font-semibold text-xl">Contact us</h1>

                <div className="flex flex-col gap-5 mt-5 ml-5">
                  <div className="flex items-center gap-3 xl:gap-3">
                    <FaSquarePhoneFlip className="text-[1.7rem]" />

                    <p>+234 705 502 8039</p>
                  </div>

                  <div className="flex items-center gap-3 xl:gap-3">
                    <MdEmail className="text-[1.8rem]" />
                    <p>support@United-4-Change.com</p>
                  </div>

                  <div className="flex items-center gap-3 xl:gap-3">
                    <Link
                      href={"http://linkedin.com/company/united4change"}
                      target="_blank"
                      // id="gradient-border"
                      className="text-[2.0rem] xl:text-[1.5rem] text-[#0963bd] rounded-lg overflow-hidden"
                    >
                      <FaLinkedin />
                    </Link>

                    <Link
                      href="https://www.instagram.com/_united4change/"
                      target="_blank"
                      className="text-[2.0rem] xl:text-[1.5rem]"
                    >
                      {/* Define the gradient once in your file */}
                      <svg width="0" height="0">
                        <linearGradient
                          id="instagram-gradient"
                          x1="100%"
                          y1="100%"
                          x2="0%"
                          y2="0%"
                        >
                          <stop stopColor="#6228d7" offset="0%" />
                          <stop stopColor="#ee2a7b" offset="50%" />
                          <stop stopColor="#f9ce34" offset="100%" />
                        </linearGradient>
                      </svg>

                      {/* Apply it to the icon using the style prop */}
                      <FaSquareInstagram
                        style={{ fill: "url(#instagram-gradient)" }}
                      />
                    </Link>

                    <Link
                      href={"https://t.me/united4change"}
                      target="_blank"
                      // id="gradient-border"
                      className="text-[2.1rem] xl:text-[1.6rem] text-[#1255d8] rounded-lg overflow-hidden"
                    >
                      <FaTelegram />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`text-center text-sm p-2 ${
          onboarding === false ? "mt-10" : "mt-7"
        }`}
      >
        <p>
          © 2025 United4Change A transparency infrastructure for global
          philanthropy. Developed by BlackSpectre Technology
        </p>
      </div>
    </div>
  );
}

export default Footer;
