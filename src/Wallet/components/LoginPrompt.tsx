"use client";

import Link from "next/link";
import { IoLockClosedOutline } from "react-icons/io5";

// Shown in place of a screen's normal content wherever a logged-in session
// is required (right now, only Linkio's onramp/offramp/transaction-history
// endpoints) but there's no token, or a request came back unauthorized.
function LoginPrompt({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
        <IoLockClosedOutline className="text-[1.5rem] text-gray-400" />
      </div>
      <p className="text-gray-500 text-sm mt-3 max-w-60">{message}</p>
      <Link
        href="/sign-in"
        className="gradient-cto rounded-xl text-sm font-semibold px-5 py-2.5 mt-4"
      >
        Log in
      </Link>
    </div>
  );
}

export default LoginPrompt;
