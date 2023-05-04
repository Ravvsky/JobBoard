"use client";
import { useState } from "react";
import ArrowIcon from "../../assets/icons/arrow.svg";

const FilterPanel = ({ name, children }: { name: string; children: any }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col justify-between gap-[2rem] font-bold">
      <div
        className="mb-[0.8rem] flex cursor-pointer items-center justify-between"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {name}
        <ArrowIcon className={`${isOpen && "rotate-180"} transition-all`} />
      </div>
      <div
        className={` overflow-hidden transition-all  ${
          isOpen ? "max-h-[100rem]" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
export default FilterPanel;
