"use client";

import { ReactNode, useMemo } from "react";
import countries from "world-countries";
import Select, { StylesConfig, FilterOptionOption } from "react-select";
import ReactCountryFlag from "react-country-flag";

type CountryOption = {
  value: string; // country code
  name: string; // plain country name
  label: ReactNode; // JSX display
};

const options: CountryOption[] = countries.map((c) => ({
  value: c.cca2,
  name: c.name.common,
  label: (
    <div className="flex items-center gap-2">
      <ReactCountryFlag
        countryCode={c.cca2}
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
      <span>{c.name.common}</span>
    </div>
  ),
}));

const customStyles: StylesConfig<CountryOption, false> = {
  control: (base) => ({
    ...base,
    borderRadius: "0.375rem",
    border: "1px solid rgba(0,0,0,0.15)",
    padding: "0.18rem 0.75rem",
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: "#e5e7eb",
    },
  }),
};

export default function CountrySelector({
  setCountry,
  defaultCountry = "Nigeria",
}: {
  setCountry: (country: string) => void;
  defaultCountry?: string; // e.g. "Nigeria"
}) {
  // Find the default option based on country name
  const defaultOption = useMemo(
    () =>
      options.find(
        (opt) => opt.name.toLowerCase() === defaultCountry?.toLowerCase()
      ),
    [defaultCountry]
  );

  return (
    <Select
      options={options}
      placeholder="Select country"
      className="mt-3"
      styles={customStyles}
      defaultValue={defaultOption}
      onChange={(country) => setCountry(country?.name || "")}
      filterOption={(option: FilterOptionOption<CountryOption>, inputValue) =>
        option.data.name.toLowerCase().includes(inputValue.toLowerCase())
      }
    />
  );
}
