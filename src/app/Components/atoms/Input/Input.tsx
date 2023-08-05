"use client";

import { Field, useFormikContext } from "formik";
import { FocusEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
type FormValues = {
  [key: string]: string;
};
const Input = ({
  name,
  type,
  placeholder,
  errors,
  touched,
  disabled,
  isAlwaysFocused,
  onBlur,
}: {
  name: string;
  type: string;
  placeholder: string;
  errors: string | string[] | undefined;
  touched: boolean | { [field: string]: boolean } | undefined;
  disabled: boolean;
  isAlwaysFocused?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const { validateForm, setFieldTouched, values } =
    useFormikContext<FormValues>();

  const handleBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
    if (onBlur) {
      onBlur(event);
    }
    if (!event.target.value) {
      setIsFocused(false);
    }
    setFieldTouched(name, true, false);

    validateForm();
  };

  return (
    <div className="relative mb-[2rem] h-[3.5rem] w-full">
      <label
        htmlFor={name}
        className={twMerge(`absolute left-[25px] z-[4] flex  items-center px-[1rem] text-main-blue transition-all
        ${
          isAlwaysFocused || isFocused || values[name].length > 0
            ? "left-[40px] top-[-10px] z-[6] bg-main-gray p-[2px] text-[1.2rem]  opacity-100 "
            : "top-[12px] text-[2rem]  opacity-30"
        }
        ${touched && errors && "text-[#ff0000]"}`)}
      >
        {placeholder}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        className={twMerge(
          `relative z-[5] h-full w-full	rounded-full border-[2px] border-main-blue bg-transparent py-[2.5rem]  pl-[3rem] text-[2rem] focus:border-main-blue focus:ring-transparent		 ${
            errors && touched && "border-[#ff0000] focus:border-[#ff0000]"
          }`,
        )}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={handleBlur}
        disabled={disabled}
      />
    </div>
  );
};
export default Input;
