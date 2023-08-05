import React from "react";
import { IconKey } from "./Icon";

const Button = (props: {
  children: React.ReactNode;
  format: IconKey;
  active: boolean;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick?: () => void;
}) => {
  const { children, format, active, ...rest } = props;

  return (
    <button
      type="button"
      className={active ? "opacity-100" : "opacity-50"}
      title={format}
      {...rest}
      style={{ width: "30px", height: "20px", margin: "0 2px" }}
    >
      {children}
    </button>
  );
};

export default Button;
