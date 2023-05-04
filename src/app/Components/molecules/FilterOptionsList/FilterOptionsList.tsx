import { Key } from "react";
import FilterOption from "../../atoms/FilterOption/FilterOption";

const FilterOptionsList = ({ options }: { options: any }) => {
  return (
    <>
      {options.map(
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
              <FilterOption label={optionArray[0]} />
            </div>
          );
        }
      )}
    </>
  );
};
export default FilterOptionsList;
