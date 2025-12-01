import React from "react";
import PieChart from "./PieChart";
import Link from "next/link";

const treasuries = [
  {
    heading: "Validator Compensation",
    color: (
      <div
        className={`w-full h-full bg-[#812880] border border-[#411540] rounded-md`}
      ></div>
    ),
    paragraph:
      "Empowering local validators to verify milestones, ensure project integrity, and maintain transparency",
  },
  {
    heading: "Emergency Response",
    color: (
      <div
        className={`w-full h-full bg-[#eb2027] border border-[#a5171c] rounded-md`}
      ></div>
    ),
    paragraph:
      "Rapid disbursements to address urgent humanitarian needs and crisis relief efforts.",
  },
  {
    heading: "Outreach & Education",
    color: (
      <div
        className={`w-full h-full bg-[#f4901e] border border-[#bd6f17] rounded-md`}
      ></div>
    ),
    paragraph:
      "Training NGOs, onboarding new partners, and providing educational resources to promote ethical giving.",
  },
  {
    heading: "Research & Innovation",
    color: (
      <div
        className={`w-full h-full bg-[#365db3] border border-[#1c305a] rounded-md`}
      ></div>
    ),
    paragraph:
      "Developing blockchain tools and systems that improve accountability and donation efficiency.",
  },
  {
    heading: "Marketing & Awareness",
    color: (
      <div
        className={`w-full h-full bg-[#33b2ba] border border-[#258086] rounded-md`}
      ></div>
    ),
    paragraph:
      "Promoting verified NGO campaigns, growing donor engagement, and building visibility across global networks.",
  },
  {
    heading: "DAO Experiments",
    color: (
      <div
        className={`w-full h-full bg-[#f26e24] border border-[#b4541c] rounded-md`}
      ></div>
    ),
    paragraph:
      "Testing community governance models for Treasury allocation and platform decision-making.",
  },
];

function Treasury() {
  const chartData = {
    labels: [
      "Validator Compensation",
      "Emergency Response",
      "Outreach & Education",
      "Research & Innovation",
      "Marketing & Awareness",
      "DAO Experiments",
    ],
    datasets: [
      {
        label: "Total donations",
        data: [22, 18, 20, 15, 15, 10],
        backgroundColor: [
          "#812880",
          "#eb2027",
          "#f4901e",
          "#365db3",
          "#33b2ba",
          "#f26e24",
        ],
      },
    ],
  };

  return (
    <div className="relative p-5 sm:p-20 mt-[5rem] text-center bg-amber-5">
      <h1 className="font-semibold text-3xl mb-3">
        Treasury, 100% transparent.
      </h1>

      <p className="lg:w-[60%] xl:w-[50%] mx-auto text-center">
        <span className="font-semibold">U4C Treasury</span> is funded only by
        donor tips and direct contributions, Every USDC supports
        mission-critical, social-driven initiatives, including:
      </p>

      <div className="flex flex-col lg:grid grid-cols-2 gap-5 md:px-20 lg:px-0 xl:px-30 mt-10">
        {treasuries.map((treasury, index) => (
          <div
            key={index}
            className="relative flex items-center gap-5 bg-gray-100 rounded-lg p-5"
          >
            {/* <div className="min-w-[0.5rem] min-h-[0.5rem] rounded-full bg-[#812880]"></div> */}

            <div className="">
              <div className="flex items-center gap-2">
                <div className="w-[1.2rem] h-[1.2rem]">{treasury.color}</div>
                <h1 className="font-semibold">{treasury.heading}</h1>
              </div>

              <p className="text-left text-sm mt-1">{treasury.paragraph}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center lg:justify-start gap-3 mt-10">
        {/* <div className="w-4 h-[2px] bg-gray-400"></div> */}
        <Link href={"/in-app-donation"}>
          <button className={`button_border_ rounded-lg`}>
            <p className="hover:bg-gray-100 rounded-lg px-7 py-3">
              Donate To Treasury
            </p>
          </button>
        </Link>

        <Link
          href={
            "https://polygonscan.com/address/0xc79974d478a60cA37A633A0e78eC3408A88E1A5C"
          }
          target="_blank"
          className="block text-sm border-b border-black"
        >
          View Transparency Ledger
        </Link>
      </div>

      <div className="flex justify-center items-center mt-[2.5rem] md:mt-[5rem]">
        <div className="h-[30rem] lg:h-[27rem]">
          <PieChart data={chartData} title="" />
        </div>
      </div>
    </div>
  );
}

export default Treasury;
