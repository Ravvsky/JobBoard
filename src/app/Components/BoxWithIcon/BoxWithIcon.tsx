"use client";
import dynamic from "next/dynamic";

const BoxWithIcon = ({
  title,
  bottomText,
  icon,
}: {
  title: string;
  bottomText?: string;
  icon: "cash" | "laptop" | "bars" | "clock";
}) => {
  const Cash = dynamic<React.SVGProps<SVGSVGElement>>(
    () => import("../../assets/icons/cash.svg"),
  );
  const Laptop = dynamic<React.SVGProps<SVGSVGElement>>(
    () => import("../../assets/icons/laptop.svg"),
  );
  const Bars = dynamic<React.SVGProps<SVGSVGElement>>(
    () => import("../../assets/icons/bars.svg"),
  );
  const Clock = dynamic<React.SVGProps<SVGSVGElement>>(
    () => import("../../assets/icons/clock.svg"),
  );

  let selectedIcon;

  switch (icon) {
    case "cash":
      selectedIcon = <Cash />;
      break;
    case "laptop":
      selectedIcon = <Laptop />;
      break;
    case "bars":
      selectedIcon = <Bars />;
      break;
    case "clock":
      selectedIcon = <Clock />;
      break;
    default:
      selectedIcon = null;
      break;
  }
  return (
    <div className="flex grow basis-[0px] items-center gap-[3rem] rounded-[1.6rem] bg-[#282828] p-[2rem]">
      <div>{selectedIcon}</div>
      <div className="flex flex-col gap-[1rem] ">
        <div className="text-[1.8rem] font-semibold capitalize">{title}</div>
        {bottomText && <div className="text-[1.4ren]">{bottomText}</div>}
      </div>
    </div>
  );
};

export default BoxWithIcon;
