import { twMerge } from "tailwind-merge";

const DashboardContainer = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
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
      <div className=" pb-[1.5rem] text-[2rem] font-semibold">{title}</div>
      {children}
    </div>
  );
};

export default DashboardContainer;
