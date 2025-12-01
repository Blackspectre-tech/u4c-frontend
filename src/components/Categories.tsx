import React from "react";
import { FaGraduationCap, FaHandHoldingWater } from "react-icons/fa";
import { FaCloudBolt } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { MdHealthAndSafety } from "react-icons/md";

const categories = [
  { title: "Food Relief", icon: <ImSpoonKnife /> },
  { title: "Clean Water Access Fund", icon: <FaHandHoldingWater /> },
  { title: "Education Access Funding", icon: <FaGraduationCap /> },
  { title: "Health Care Programs", icon: <MdHealthAndSafety /> },
  { title: "Climate Action", icon: <FaCloudBolt /> },
];

const Categories = () => {
  return (
    <div className="flex flex-col items-center text-center bg-[#F2F8F9] p-5 sm:p-20 mt-[5rem]">
      <h1 className="font-semibold text-3xl mb-3">Campaigns Categories</h1>
      <p className="lg:w-[80%] xl:w-[70%] mx-auto">
        Select the impact area that matters most to your community
      </p>

      <div className="flex flex-wrap justify-center items-center gap-10 mt-[2.5rem]">
        {categories.map((category, index) => (
          <div
            id="gradient-border"
            key={index}
            className="px-5 py-2 flex items-center rounded-full gap-1"
          >
            <div className="min-w-9 min-h-9 w-9 h-9 text-[1.5rem] flex justify-center items-center">
              {category.icon}
            </div>

            <p>{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
