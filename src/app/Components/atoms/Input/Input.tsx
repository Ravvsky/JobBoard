import React, { useState } from "react";
import { FocusEvent } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  errors?: string | string[] | undefined;
  touched?: boolean | { [field: string]: boolean } | undefined;
  disabled?: boolean;
  isAlwaysFocused?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};
type Values = {
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
  onChange,
  onBlur,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(event);
    }
    if (!event.target.value) {
      setIsFocused(false);
    }
  };
  const [values, setValues] = useState<Values>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
      setValues({
        ...values,
        [name]: event.target.value,
      });
    }
  };
  return (
    <div className="relative mb-[2rem] h-[3.5rem] w-full">
      <label
        htmlFor={name}
        className={twMerge(
          `absolute left-[25px] z-[4] flex items-center px-[1rem] text-main-blue transition-all ${
            isAlwaysFocused ||
            isFocused ||
            (values && values[name] && values[name].length > 0)
              ? "left-[40px] top-[-10px] z-[6] bg-main-gray p-[2px] text-[1.2rem] opacity-100 "
              : "top-[12px] text-[2rem] opacity-30"
          } ${touched && errors && "text-[#ff0000]"}`,
        )}
      >
        {placeholder}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={twMerge(
          `relative z-[5] h-full w-full rounded-full border-[2px] border-main-blue bg-transparent py-[2.5rem] pl-[3rem] text-[2rem] focus:border-main-blue focus:ring-transparent ${
            errors && touched && "border-[#ff0000] focus:border-[#ff0000]"
          }`,
        )}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
