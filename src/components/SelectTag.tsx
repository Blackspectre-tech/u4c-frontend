"use client";

import { ReactNode } from "react";
import Select, { StylesConfig } from "react-select";

type Option = {
  value: string | number;
  name: string;
  label: ReactNode;
};

export default function CustomSelector<T>({
  optionsList,
  changeEvent,
  mapOption,
  placeholder = "Select option",
  control_class = "mt-3",
  control_style = {
    borderRadius: "0.5rem",
    border: "1px solid rgba(0,0,0,0.15)",
    padding: "0.25rem 0.75rem",
  },
}: {
  optionsList: T[];
  changeEvent: (selected: Option | null) => void;
  mapOption: (item: T) => Option; // 👈 transforms raw item into Select option
  placeholder?: string;
  control_class?: string;
  control_style?: Record<string, any>;
}) {
  const options = optionsList.map(mapOption);

  const customStyles: StylesConfig<Option, false> = {
    control: (base) => ({
      ...base,
      ...control_style,
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? "white" : "black",
      "&:hover": { backgroundColor: "#e5e7eb" },
    }),
  };

  return (
    <Select
      options={options}
      placeholder={placeholder}
      className={control_class}
      styles={customStyles}
      onChange={(opt) => changeEvent(opt || null)}
    />
  );
}
