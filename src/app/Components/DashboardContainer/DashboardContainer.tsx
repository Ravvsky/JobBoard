"use client";
import { twMerge } from "tailwind-merge";
import HorizontalDots from "../../assets/icons/horizontal-dots.svg";
const DashboardContainer = ({
  title,
  className,
  onClick,
  children,
}: {
  title: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        `min-h-[5rem] w-full rounded-[1.5rem] bg-light-gray p-[2.5rem] ${
          className && className
        }`,
      )}
    >
      <div className=" flex justify-between pb-[1.5rem] text-[2rem] font-semibold">
        {title}
        {onClick && (
          <button type="button" onClick={onClick}>
            <HorizontalDots className="h-[3rem] w-auto fill-light-blue stroke-light-blue hover:fill-white hover:stroke-white" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default DashboardContainer;
