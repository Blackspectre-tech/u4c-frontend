"use client";

import Campaign_DONOR from "@/components/dashboard/donor/Campaign";
import Campaign_NGO from "@/components/dashboard/ngo/Campaign";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Home() {
  const { online, organization } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <div className="px-5 sm:px-10">
      {organization === true ? <Campaign_NGO /> : <Campaign_DONOR />}
    </div>
  );
}
