"use client";
import { FieldHookConfig, FieldInputProps } from "formik";
import { InputHTMLAttributes, Ref } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> &
  FieldHookConfig<boolean> & {
    width?: number;
    height?: number;
    id: string;
    field?: FieldInputProps<boolean>;
    ref?: Ref<HTMLInputElement>;
  };

const Checkbox = ({
  width = 1,
  height = 1,
  id,
  field,
  ...props
}: CheckboxProps) => {
  const dynamicWidth = `w-[${width}rem]`;
  const dynamicHeight = `h-[${height}rem]`;
  return (
    <input
      type="checkbox"
      id={id}
      {...field}
      {...props}
      className={`${dynamicWidth} ${dynamicHeight} peer cursor-pointer rounded-[0.4rem] border-[1px] border-solid border-main-blue/40 bg-light-gray checked:bg-main-blue checked:hover:bg-main-blue focus:ring-transparent focus:ring-offset-0 checked:focus:bg-main-blue`}
    />
  );
};

export default Checkbox;
