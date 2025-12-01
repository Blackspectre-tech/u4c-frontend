import { useState } from "react";
import {
  PiArrowElbowRightDownFill,
  PiArrowElbowRightUpFill,
} from "react-icons/pi";

export default function Faq({
  heading,
  paragraph,
  index,
}: {
  heading: string;
  paragraph: string;
  index: number;
}) {
  type open_Type = { faq_index: number | null; open: boolean };
  const [open, setOpen] = useState<open_Type>({ faq_index: 0, open: false });

  return (
    <div className={`rounded-lg relative`}>
      <div className="w-full h-full bg-[#fcfcfc] hover:bg-gray-50 rounded-lg border-2 border-gray-400/10 p-5">
        <div
          onClick={() =>
            setOpen((prev) => {
              const copy = { ...prev };
              if (index === prev.faq_index) copy.open = !prev.open;
              else {
                copy.faq_index = index;
                copy.open = true;
              }

              return copy;
            })
          }
          className="w-full cursor-pointer flex justify-between text-center"
        >
          <h1 className="font-semibold text-left text-lg">{heading}</h1>
          <div className="w-[2rem] h-[2rem] flex justify-center items-center text-[1.8rem] bg-amber-10">
            {open.faq_index === index && open.open === true ? (
              <PiArrowElbowRightUpFill />
            ) : (
              <PiArrowElbowRightDownFill />
            )}
          </div>
        </div>

        <div
          className={`w-full ${
            open.faq_index === index && open.open === true
              ? "mt-5"
              : "h-0 overflow-hidden"
          } transition-all duration-[0.5s]`}
        >
          <div className="relative rounded-lg">
            <div className="absolute top-[50%] left-[50%] w-[calc(100%+4px)] h-[calc(100%+4px)] translate-[-50%]"></div>
            <p className="relative z-10">{paragraph}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
