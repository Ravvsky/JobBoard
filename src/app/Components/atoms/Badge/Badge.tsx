const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-[2rem] bg-blueish-gray px-[1rem] text-[1.2rem] capitalize text-dark-blue">
      {children}
    </div>
  );
};

export default Badge;
