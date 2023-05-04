"use client";

import { useEffect, useRef, useState } from "react";

const RangeSlider = ({ min, max }: { min: number; max: number }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minValueRef = useRef<HTMLInputElement>(null);
  const maxValueRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = (value: any) =>
    Math.round(((value - min) / (max - min)) * 100);

  useEffect(() => {
    if (maxValueRef.current) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(+maxValueRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minValue]);

  useEffect(() => {
    if (minValueRef.current && maxValueRef.current) {
      const minPercent = getPercent(+minValueRef.current.value);
      const maxPercent = getPercent(+maxValueRef.current.value);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minValue, maxValue]);

  return (
    <>
      <div className="mb-[0.5rem] text-[2rem] font-medium text-main-blue">
        {`$${minValue} - $${maxValue}`}
      </div>
      <div className="relative min-h-[5rem] w-full  pt-[2rem]">
        <input
          type="range"
          min={min}
          max={max}
          step={100}
          value={minValue}
          ref={minValueRef}
          onChange={(event: any) => {
            const value = Math.min(+event.target.value, maxValue - 1);
            setMinValue(value);
            event.target.value = value.toString();
          }}
          className={`thumb:pointer-events-all pointer-events-none absolute h-0 w-[90%] appearance-none outline-none thumb:pointer-events-auto thumb:relative thumb:mt-[0.3rem] thumb:h-[2rem] thumb:w-[2rem] thumb:cursor-pointer  thumb:appearance-none thumb:rounded-[50%] thumb:bg-main-blue ${
            minValue > max - 100 ? "z-[5]" : "z-[3]"
          }`}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={100}
          value={maxValue}
          ref={maxValueRef}
          onChange={(event: any) => {
            const value = Math.max(+event.target.value, minValue + 1);
            setMaxValue(value);
            event.target.value = value.toString();
          }}
          className={`thumb:pointer-events-all pointer-events-none absolute z-[4] h-0  w-[90%] appearance-none outline-none thumb:pointer-events-auto thumb:relative thumb:mt-[0.6rem] thumb:h-[2rem] thumb:w-[2rem] thumb:cursor-pointer thumb:appearance-none thumb:rounded-[50%] thumb:bg-main-blue`}
        />
        <div className="relative w-[90%]">
          <div className="z-1 absolute h-[0.6rem] w-full rounded-[2rem] bg-light-blue"></div>
          <div
            ref={range}
            className=" absolute h-[0.6rem] w-full bg-main-blue"
          ></div>
        </div>
      </div>
      <div className=" text-[1.2rem] font-medium">
        {`Average salary for similar position: $3500,00`}
      </div>
    </>
  );
};

export default RangeSlider;
