"use client";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import MenuItem from "../../MenuItem/MenuItem";

const MobileNavigation = () => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMenuVisible(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [sidebarRef]);

  const hamburgerClickHandler = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="md:hidden" ref={sidebarRef}>
      <div>
        <div
          className={`fixed top-0 flex h-full min-w-[20rem] flex-col items-end justify-start bg-main-blue p-[2rem] text-right transition-all duration-200 ease-in ${
            isMenuVisible ? "right-0" : "-right-full"
          }`}
        >
          <button
            type="button"
            onClick={hamburgerClickHandler}
            className="pb-[2rem] text-[2.5rem]"
          >
            X
          </button>

          <div className="flex flex-col gap-[1.5rem] text-[#2C2C2C]">
            <MenuItem href={"/"} currentItemColored={false}>
              Jobs
            </MenuItem>
            <MenuItem href={"/companies"} currentItemColored={false}>
              Companies
            </MenuItem>
            <MenuItem href={"/candidates"} currentItemColored={false}>
              Candidates
            </MenuItem>
            <MenuItem href={"/inspiring-work"} currentItemColored={false}>
              Inspiring Work
            </MenuItem>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={hamburgerClickHandler}
        aria-label="hamburger menu"
      >
        <Icon
          icon="solar:hamburger-menu-linear"
          className={`transition-all duration-200 ease-in hover:text-main-blue ${
            isMenuVisible && "hidden"
          }`}
        />
      </button>
    </div>
  );
};

export default MobileNavigation;
