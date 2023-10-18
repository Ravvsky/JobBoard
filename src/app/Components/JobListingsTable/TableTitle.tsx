"use client";
import { useState } from "react";
import ArrowDown from "../../assets/icons/arrow-down.svg";

const TableTitle = ({
  title,
  showArrow = true,
  onClick,
}: {
  title: string;
  showArrow?: boolean;
  onClick?: () => void;
}) => {
  const [isRotated, setIsRotated] = useState(false);

  const clickHandler = () => {
    setIsRotated(!isRotated);
    onClick && onClick();
  };
  return (
    <button
      type="button"
      onClick={clickHandler}
      className="group flex w-max grow items-center gap-[0.4rem] px-[2.4rem] py-[1.2rem] text-[1.2rem] font-medium text-[#667085] transition-all hover:text-[#bdbdbd]"
    >
      {title}
      {!showArrow && (
        <ArrowDown
          className={`stroke-[#667085] transition-all group-hover:stroke-[#bdbdbd] ${
            isRotated && "rotate-180"
          }`}
        />
      )}
    </button>
  );
};
export default TableTitle;
