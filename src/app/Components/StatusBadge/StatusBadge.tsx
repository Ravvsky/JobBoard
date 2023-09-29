const StatusBadge = ({ status }: { status: "active" | "inactive" }) => {
  return (
    <div
      className={`flex items-center gap-[0.6rem] rounded-[1.6rem] px-[0.6rem] py-[0.2rem] ${
        status === "active" && "bg-[#ECFDF3] text-[#037847]"
      } ${status === "inactive" && "bg-[#F2F4F7] text-[#364254]"}`}
    >
      <div
        className={`h-[0.6rem] w-[0.6rem] rounded-full ${
          status === "active" && "bg-[#037847]"
        } ${status === "inactive" && "bg-[#364254]"}`}
      ></div>
      <div className="capitalize">{status}</div>
    </div>
  );
};

export default StatusBadge;
