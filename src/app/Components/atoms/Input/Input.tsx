"use client";

import { Field } from "formik";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const Input = ({ name, type, placeholder, errors, touched }) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <div className="relative mb-[2rem] h-[3.5rem]">
      <label
        htmlFor={name}
        className={twMerge(`absolute left-[25px] z-[4] flex  items-center px-[1rem] text-main-blue transition-all
        ${
          isFocused
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
          }`
        )}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={(e) => {
          if (!e.target.value) {
            setIsFocused(false);
          }
        }}
      />
    </div>
  );
};
export default Input;