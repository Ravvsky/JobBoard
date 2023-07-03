const DashboardContainer = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-[5rem] w-full rounded-[1.5rem] bg-light-gray p-[2.5rem]">
      <div className=" pb-[1.5rem] text-[2rem] font-semibold">{title}</div>
      {children}
    </div>
  );
};

export default DashboardContainer;
