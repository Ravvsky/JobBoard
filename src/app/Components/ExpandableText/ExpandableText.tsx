"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const ExpandableText = ({
  text,
  lines,
  moreText,
  lessText,
}: {
  text: string;
  lines: number;
  moreText: string;
  lessText: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const lineHeight = parseInt(getComputedStyle(container).lineHeight);
      const containerHeight = container.clientHeight;
      const calculatedLineCount = Math.floor(containerHeight / lineHeight);
      setLineCount(calculatedLineCount);
    }
  }, []);
  const buttonHandler = () => {
    if (lineCount > lines) {
      setLineCount(1);
    } else setLineCount(9999);
  };
  return (
    <div ref={containerRef} className="text-[1.2rem] text-[#9D9D9D]">
      <span
        className={twMerge(`${lineCount > lines && `line-clamp-${lines}`} `)}
      >
        {text}
      </span>{" "}
      <button
        type="button"
        className="text-main-blue transition-all hover:text-white"
        onClick={buttonHandler}
      >
        {`${lineCount > 3 ? moreText : lessText}`}
      </button>
    </div>
  );
};
export default ExpandableText;
