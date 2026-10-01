"use client";

import { RootState } from "@/redux/store";
import Link from "next/link";
import { FaFolderOpen } from "react-icons/fa";
import { TbPlus } from "react-icons/tb";
import { useSelector } from "react-redux";

// --------------------------------------------------------- [  ]
export const NavigationTemplate = ({
  navigation,
  hide = true,
  title,
}: {
  navigation: { path: string; title: string }[];
  hide?: boolean;
  title: string;
}) => {
  const { organization } = useSelector((state: RootState) => state.user);
  // console.log("[ organization ]: ", organization);

  const handle_download = () => {
    const guid_check = organization
      ? [
          {
            path: "/guide/Onboarding_Guide_NGO.pdf",
            filename: "Onboarding_Guide_NGO.pdf",
          },
        ]
      : [
          {
            path: "/guide/Onboarding_Guide_Donor.pdf",
            filename: "Onboarding_Guide_Donor.pdf",
          },
        ];

    // 1. Define an array of the files you want to download
    // NOTE: Remove "public" from the path. "/guide/..." looks inside "public/guide/..."
    const filesToDownload = [
      ...guid_check,
      // {
      //   path: "/guide/Onboarding_Guide_Overview.pdf",
      //   filename: "Onboarding_Guide_Overview.pdf",
      // },
    ];

    // 2. Loop through the array and trigger a download event for each individual file
    filesToDownload.forEach((file) => {
      const link = document.createElement("a");
      link.href = file.path;
      link.download = file.filename;

      // Append, click, and remove instantly
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className={hide ? "" : "flex items-end justify-between"}>
      <div className="">
        <div className="flex gap-5">
          {navigation.map((path, index) => (
            <Link
              href={path.path}
              key={index}
              className="flex items-center gap-2 opacity-50"
            >
              <FaFolderOpen className="text-[1.2rem]" />{" "}
              <p className="text-sm">{path.title}</p>
            </Link>
          ))}
        </div>

        <h1 className="text-[1.5rem]">{title}</h1>
      </div>

      {hide != true && (
        <div
          onClick={handle_download}
          className="flex items-center gap-2 hover:rounded-full cursor-pointer border-b border-gray-300 hover:bg-gray-100 py-2 px-4"
        >
          <p className="">Download Guide</p> <TbPlus />
        </div>
      )}
    </div>
  );
};
