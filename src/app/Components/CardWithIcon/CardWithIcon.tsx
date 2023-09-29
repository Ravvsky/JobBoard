"use client";

import dynamic from "next/dynamic";
const CardWithIcon = ({
  icon,
  title,
  description,
}: {
  icon: "code" | "microphone" | "people" | "check";
  title: string;
  description: string;
}) => {
  const Code = dynamic<React.SVGProps<SVGSVGElement>>(
    () => import("../../assets/icons/code.svg"),
  );
  const Microphone = dynamic<React.SVGProps<SVGSVGElement>>(
    () => import("../../assets/icons/microphone.svg"),
  );
  const People = dynamic<React.SVGProps<SVGSVGElement>>(
    () => import("../../assets/icons/people.svg"),
  );
  const Check = dynamic<React.SVGProps<SVGSVGElement>>(
    () => import("../../assets/icons/check.svg"),
  );

  let selectedIcon;

  switch (icon) {
    case "code":
      selectedIcon = <Code />;
      break;
    case "microphone":
      selectedIcon = <Microphone />;
      break;
    case "people":
      selectedIcon = <People />;
      break;
    case "check":
      selectedIcon = <Check />;
      break;
    default:
      selectedIcon = null;
      break;
  }
  return (
    <div className=" h-full w-full rounded-[1rem] bg-gradient-to-t from-[#00AEF9] to-[#B5DDE9] p-[1px]">
      <div
        className={`flex h-full flex-col gap-[3rem] rounded-[1rem] bg-[#3281A2] bg-[url('./assets/wave.svg')]	bg-[center_9rem] bg-no-repeat p-[2.5rem]`}
      >
        <div className="flex flex-col gap-[1rem]">
          {selectedIcon}
          <div className="text-[2rem] font-semibold text-[#EAEAEA]">
            {title}
          </div>

          <div className="font-medium text-[#EAEAEA]">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default CardWithIcon;
