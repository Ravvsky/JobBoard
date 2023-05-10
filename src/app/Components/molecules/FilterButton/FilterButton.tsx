"use client";

import { setFilter } from "@/redux/features/jobOfferFilters";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";

const FilterButton = ({
  children,
  type,
  className,
  category,
}: {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className?: string;
  category: string;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    setIsClicked(!isClicked);
    dispatch(setFilter({ category, value: children as string }));
  };
  return (
    <button
      data-cy="FilterButton"
      type={type}
      onClick={clickHandler}
      className={` rounded-[5rem] ${
        isClicked
          ? "bg-main-blue hover:bg-blueish-gray"
          : "bg-blueish-gray hover:bg-main-blue"
      } px-[1rem] py-[0.5rem] text-[1.4rem] font-medium  text-dark-blue transition-all duration-200 ease-in  ${className}`}
    >
      {children}
    </button>
  );
};

export default FilterButton;
