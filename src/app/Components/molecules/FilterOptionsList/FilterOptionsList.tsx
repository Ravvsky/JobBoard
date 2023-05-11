"use client";
import { Key, useEffect, useState } from "react";
import FilterOption from "../../atoms/FilterOption/FilterOption";

const FilterOptionsList = ({
  options,
  category,
}: {
  options: any;
  category: string;
}) => {
  return (
    <>
      {options &&
        options.map(
          (
            option: { attributes: { [s: string]: string } | ArrayLike<string> },
            index: Key | null | undefined
          ) => {
            const optionArray: string[] = Object.values(option.attributes);
            return (
              <div
                className="flex items-center gap-[1rem] capitalize"
                key={index}
              >
                <FilterOption label={optionArray[0]} category={category} />
              </div>
            );
          }
        )}
    </>
  );
};
export default FilterOptionsList;
