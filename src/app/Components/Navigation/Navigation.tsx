"use client";

import { useState, useEffect } from "react";
import Button from "../Button/Button";
import MenuItem from "../MenuItem/MenuItem";
import MobileNavigation from "./MobileNavigation/MobileNavigation";

const Navigation = () => {
  const buttonClickHandler = () => {};
  //TODO Test component after creating menu functionality on backend
  return (
    <nav className="text-[3.6rem] sticky top-0 font-bold py-[2.8rem] flex items-center justify-between">
      <div>
        Job<span className="text-main-blue">Board</span>
      </div>
      <div className="hidden gap-[3rem] md:flex">
        <MenuItem href={"/"} currentItemColored={true}>
          Jobs
        </MenuItem>
        <MenuItem href={"/companies"} currentItemColored={true}>
          Companies
        </MenuItem>
        <MenuItem href={"/candidates"} currentItemColored={true}>
          Candidates
        </MenuItem>
        <MenuItem href={"/inspiring-work"} currentItemColored={true}>
          Inspiring Work
        </MenuItem>
      </div>
      <Button
        type="button"
        onClick={buttonClickHandler}
        className="hidden lg:block"
      >
        Post a job
      </Button>
      <MobileNavigation />
    </nav>
  );
};

export default Navigation;
