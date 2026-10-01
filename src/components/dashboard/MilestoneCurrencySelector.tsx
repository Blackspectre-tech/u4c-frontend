"use client";

import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePercentage } from "react-icons/ai";

type options_type = {
  value: any;
  id: string;
  label: string;
  type: "icon" | "image" | string;
};

interface selector_props {
  options: options_type[]; // Use array type, not tuple
  selected: options_type;
  setSelected: (val: options_type) => void; // Change 'null' to 'void'
}

export default function MilestoneCurrencySelector({
  options,
  selected,
  setSelected,
}: selector_props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the entire component, close it
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Use mousedown instead of click for the global listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    // This stops the 'mousedown' on the document from seeing this specific click
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={dropdownRef} className="relative w-40">
      <button
        type="button"
        // Use onMouseDown instead of onClick to beat the document listener
        onMouseDown={handleToggle}
        className="gradient-cto-border border border-transparent flex items-center justify-between w-full text-white rounded-lg py-2 px-3"
      >
        <div className="flex items-center gap-2 w-full">
          {selected.type === "image" ? (
            <Image src={selected.value} alt="" width={22} height={22} />
          ) : (
            <AiOutlinePercentage className="text-[1.1rem] text-black" />
          )}

          <p className="font-semibold text-black/80 text-xs">
            {selected.label}
          </p>
        </div>

        <IoIosArrowDown
          className={`ml-1 text-black/80 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 border-gray-300"
            >
              {option.type === "image" ? (
                <Image src={option.value} alt="" width={22} height={22} />
              ) : (
                <AiOutlinePercentage className="text-[1.2rem]" />
              )}

              <p className="font-semibold text-black/50 text-xs">
                {option.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
