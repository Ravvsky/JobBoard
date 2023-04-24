const Button = ({
  children,
  type,
  className,
  onClick,
}: {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className?: string;
  onClick: () => void;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-[0.4rem] px-[3.2rem] text-[2rem] text-dark-blue bg-main-blue rounded-[5rem] hover:bg-white transition-all ease-in duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
