import { twMerge } from "tailwind-merge";

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
      className={twMerge(
        `rounded-[5rem] bg-main-blue px-[3.2rem] py-[0.4rem] text-[2rem] text-dark-blue transition-all duration-200 ease-in hover:bg-white ${className}`,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
