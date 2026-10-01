import React from "react";

const Steps = ({
  heading,
  subheading,
  steps,
  first = true,
}: {
  heading: string;
  first?: boolean;
  subheading: string;
  steps: { heading: string; paragraph: string }[];
}) => {
  return (
    <div className="bg-[#fcfcfc] flex flex-col items-center text-center px-5 sm:px-20 mt-40 scroll_effect_parent_">
      <h1 className="font-semibold text-3xl mb-3">{heading}</h1>
      <p className="lg:w-[80%] xl:w-[70%] mx-auto">{subheading}</p>

      {first === true ? (
        <div className="w-full gap-32 relative flex flex-col lg:items-center mt-20">
          {/* Vertical line in the middle */}
          <div className="absolute top-0 left-0 xl:left-1/2 w-px h-[85%] bg-[#00000036] lg:-translate-x-1/2 mt-5"></div>

          {steps.map((step, index) => {
            const side = index % 2 === 0 ? "left" : "right"; // 0 => left, 1 => right

            // console.log("====================================");
            // console.log(side);
            // console.log("====================================");

            return (
              <div
                key={index}
                className={`${
                  side === "left" ? "lg:self-start" : "lg:self-end"
                } lg:w-[50%] my-2`}
              >
                <div
                  className={`lg:flex flex-col ${
                    side === "left"
                      ? "lg:items-end text-left lg:text-right"
                      : "lg:items-start text-left lg:text-left"
                  }`}
                >
                  <div
                    className={`flex items-center gap-1 lg:block relative mb-3`}
                  >
                    <div className="lg:hidden translate-x-2 flex items-center gap-2">
                      <div
                        id="gradient-border"
                        className={`min-w-4 min-h-4 rounded-full`}
                      ></div>
                      <div className="relative w-full h-full">
                        <div
                          id="gradient-border"
                          className={`rounded-lg text-sm font-semibold flex justify-center items-center min-w-8 min-h-8`}
                        >
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    <h1
                      className={`font-semibold text-lg ${
                        side === "left" ? "lg:pr-5" : "lg:pl-5"
                      }`}
                    >
                      {step.heading}
                    </h1>

                    <div
                      id="gradient-border"
                      className={`hidden lg:block absolute ${
                        side === "left"
                          ? "right-0  translate-x-[50%]"
                          : "left-0 translate-x-[-50%]"
                      } top-[50%] translate-y-[-50%] w-5 h-5 rounded-full`}
                    >
                      <div className="relative w-full h-full">
                        <div
                          id="gradient-border"
                          className={`absolute top-[50%] ${
                            side === "left"
                              ? "right-0 translate-x-[calc(100%+1rem)]"
                              : "left-0 translate-x-[calc(-100%-1rem)]"
                          } translate-y-[-50%] w-28 rounded-lg font-semibold px-5 py-2`}
                        >
                          Step {index + 1}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-full xl:w-[70%] bg-linear-to-r ${
                      side === "left"
                        ? "from-gray-200/50 to-transparent lg:from-transparent lg:to-gray-200/50 ml-5 lg:mr-5"
                        : "from-gray-200/50 to-transparent lg:from-gray-200/50 lg:to-transparent ml-5 lg:ml-5"
                    } rounded-md scroll_effect_child_ p-5`}
                  >
                    <p className="">{step.paragraph}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full flex flex-col lg:grid grid-cols-2 gap-14 md:px-20 lg:px-0 xl:px-30 mt-20">
          {steps.map((step, index) => {
            return (
              <div key={index} className={`flex flex-col text-left my-2`}>
                <div className={`relative flex items-center gap-3 mb-3`}>
                  <div
                    id="gradient-border"
                    className={`min-w-8 min-h-8 flex justify-center items-center rounded-full font-semibold text-sm`}
                  >
                    {index + 1}
                  </div>

                  <h1 className={`font-semibold text-lg`}>{step.heading}</h1>
                </div>

                <div
                  className={`bg-gray-200/50 flex-1 rounded-md scroll_effect_child_ mr-5 p-5`}
                >
                  <p className="">{step.paragraph}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Steps;
