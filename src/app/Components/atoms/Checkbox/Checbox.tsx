import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  height?: number;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const Checkbox = ({ width = 1, height = 1, ...props }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      {...props}
      className={`peer h-[${height}rem] w-[${width}rem] rounded-[0.4rem] border-[1px] border-solid border-main-blue border-opacity-40	bg-light-gray checked:bg-main-blue focus:ring-transparent  focus:ring-offset-0	checked:focus:bg-main-blue`}
    />
  );
};

export default Checkbox;
