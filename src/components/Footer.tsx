import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaPhoneFlip, FaSquarePhoneFlip } from "react-icons/fa6";
import { MdEmail, MdFacebook, MdOutlineMailOutline } from "react-icons/md";

function Footer({ onboarding = false }: { onboarding?: boolean }) {
  return (
    <div className="p-5 sm:px-20 mt-[5rem]">
      <div className="flex flex-col items-center bg-gradient-to-r from-[#812880] to-[#eb2027] to-60% rounded-lg text-white p-10">
        <div className="flex items-center mb-8">
          <div className="w-20 h-20 bg-amber-100 border-2 border-white rounded-full relative translate-x-[1rem] overflow-hidden">
            <Image
              src={
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764"
              }
              alt=""
              className="w-full h-full object-cover"
              fill
            />
          </div>
          <div className="w-20 h-20 bg-amber-100 border-2 border-white rounded-full relative overflow-hidden">
            <Image
              src={
                "https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
              }
              alt=""
              className="w-full h-full object-cover"
              fill
            />
          </div>
          <div className="w-20 h-20 bg-amber-100 border-2 border-white rounded-full relative translate-x-[-1rem] overflow-hidden">
            <Image
              src={
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=761"
              }
              alt=""
              className="w-full h-full object-cover"
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
        <div className="mt-[5rem] flex flex-col md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-10 lg:gap-0">
          <div className="">
            <Image
              src={"/icons/u4c-logo.svg"}
              className="mb-4"
              alt=""
              width={60}
              height={60}
            />

            <p>
              Driven by compassion, powered by technology, we connect people to
              purpose and bring resources where they’re needed most
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end lg:items-center">
            <div className="">
              <h1 className="font-semibold text-xl">Get Involved</h1>
              <div className="flex flex-col gap-2 mt-5 capitalize">
                <Link href="/explore">Explore Projects</Link>
                {/* <p>Completed Projects</p> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-start lg:items-center">
            <div className="">
              <h1 className="font-semibold text-xl">Quick Links</h1>

              <div className="flex flex-col gap-2 capitalize mt-5">
                <Link href="/privacy-policy">privacy policy</Link>
                {/* <Link href="/terms-and-conditions">terms and conditions</Link> */}
                <Link href="/terms-of-use">terms of use</Link>
                <Link href="/aml-ctf-policy">aml ctf policy</Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end lg:items-start">
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
                    href={"https://www.facebook.com/share/15y4cdt1bX/"}
                    target="_blank"
                    id="gradient-border"
                    className="w-[2.8rem] h-[2.8rem] min-w-[2.8rem] min-h-[2.8rem] text-[1.0rem] xl:text-[1.5rem] rounded-lg overflow-hidden"
                  >
                    <div className="w-full h-full flex justify-center items-center bg-white hover:bg-gray-50">
                      <MdFacebook />
                    </div>
                  </Link>

                  <Link
                    href={"http://linkedin.com/company/united4change"}
                    target="_blank"
                    id="gradient-border"
                    className="w-[2.8rem] h-[2.8rem] min-w-[2.8rem] min-h-[2.8rem] text-[1.0rem] xl:text-[1.5rem] rounded-lg overflow-hidden"
                  >
                    <div className="w-full h-full flex justify-center items-center bg-white hover:bg-gray-50">
                      <FaLinkedinIn />
                    </div>
                  </Link>

                  <Link
                    href={"https://www.instagram.com/_united4change/"}
                    target="_blank"
                    id="gradient-border"
                    className="w-[2.8rem] h-[2.8rem] min-w-[2.8rem] min-h-[2.8rem] text-[1.0rem] xl:text-[1.5rem] rounded-lg overflow-hidden"
                  >
                    <div className="w-full h-full flex justify-center items-center bg-white hover:bg-gray-50">
                      <FaInstagram />
                    </div>
                  </Link>
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
          Copyright © 2010-2025 United-for-change Company S.L. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
