"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

export type AccountCheck = {
  loading: boolean;
  name: string | null;
  error: boolean;
};

// Shows under an account-number field once a bank + 10-digit account number
// are both present, confirming whose account the money is actually going
// to/from before the user submits.
function AccountVerification({ check }: { check: AccountCheck }) {
  if (check.loading)
    return (
      <p className="flex items-center gap-2 text-sm text-gray-500 mt-2 pl-1">
        <AiOutlineLoading3Quarters className="animate-spin text-xs" />
        Verifying account...
      </p>
    );

  if (check.name)
    return (
      <p className="flex items-center gap-2 text-sm text-green-600 mt-2 pl-1">
        <IoCheckmarkCircleOutline className="text-[0.9rem]" />
        {check.name}
      </p>
    );

  if (check.error)
    return (
      <p className="flex items-center gap-2 text-sm text-red-600 mt-2 pl-1">
        <IoCloseCircleOutline className="text-[0.9rem]" />
        Couldn't verify this account — check the bank and account number.
      </p>
    );

  return null;
}

export default AccountVerification;
