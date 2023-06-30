"use client";
import { Key } from "react";
import FilterOption from "../../atoms/FilterOption/FilterOption";
interface Option {
  id: number;
  attributes: {
    [key: string]: string | null;
  };
}
const FilterOptionsList = ({
  options,
  category,
}: {
  options: Option[];
  category: string;
}) => {
  return (
    <>
      {options &&
        options.map((option: Option, index: Key | null | undefined) => {
          const optionArray: (string | null)[] = Object.values(
            option.attributes,
          );
          return (
            <div
              className="flex items-center gap-[1rem] capitalize"
              key={index}
            >
              <FilterOption label={optionArray[0] || ""} category={category} />
            </div>
          );
        })}
    </>
  );
};
export default FilterOptionsList;
