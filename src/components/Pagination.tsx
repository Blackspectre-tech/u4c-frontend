import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Params_Type = {
  categories__name: string;
  search: string;
  status: string;
  size: number;
  page: number;
};

function Pagination({
  data,
  count,
  params,
  setParams,
}: {
  data: any;
  count: number;
  params: Params_Type;
  setParams: React.Dispatch<React.SetStateAction<Params_Type>>;
}) {
  const data_count_ = data?.count || 0;
  const count_ = count || 0;
  console.log("====================================");
  console.log(data);
  console.log("====================================");

  return (
    <>
      <div className="flex justify-center mt-[5rem]">
        <div className="flex items-center gap-5">
          <div
            onClick={() => {
              params.page > 1 &&
                setParams((prev) => ({ ...prev, page: prev.page - 1 }));
            }}
            className={`${
              params.page === 1 && "opacity-70 pointer-events-none"
            } text-[#381237] font-bold cursor-pointer text-[1.5rem]
             rounded-xl border-[2px] border-transparent
             [background:linear-gradient(#fcfcfc,#fcfcfc)_padding-box,linear-gradient(90deg,#812880,#eb2027)_border-box] overflow-hidden p-3`}
          >
            <IoIosArrowBack />
          </div>

          <div className="flex items-center gap-1">
            <div className="rounded-lg text-lg cursor-pointer px-2 py-[0.6rem]">
              {params.page}
            </div>

            <p className="text-lg font-semibold">of</p>

            <div className="text-black rounded-lg text-lg cursor-pointer px-2 py-[0.6rem]">
              {Math.floor(data_count_ / count_) +
                (data_count_ % count_ === 0 ? 0 : 1)}
            </div>
          </div>

          <div
            onClick={() => {
              if (!(data?.count > count)) return;
              setParams((prev) => ({ ...prev, page: prev.page + 1 }));
            }}
            className={`${
              !(data?.count > count) && "opacity-70 pointer-events-none"
            } text-[#381237] font-bold cursor-pointer text-[1.5rem]
             rounded-xl border-[2px] border-transparent
             [background:linear-gradient(#fcfcfc,#fcfcfc)_padding-box,linear-gradient(90deg,#812880,#eb2027)_border-box] overflow-hidden p-3`}
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;
