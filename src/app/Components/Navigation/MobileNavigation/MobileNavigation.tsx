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
          className={`bg-main-blue fixed h-full top-0 p-[2rem] min-w-[20rem] flex flex-col justify-start items-end text-right transition-all ease-in duration-200 ${
            isMenuVisible ? "right-0" : "-right-full"
          }`}
        >
          <button
            type="button"
            onClick={hamburgerClickHandler}
            className="text-[2.5rem] pb-[2rem]"
          >
            X
          </button>

          <div className="flex flex-col gap-[1.5rem]">
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
      <button type="button" onClick={hamburgerClickHandler}>
        <Icon
          icon="solar:hamburger-menu-linear"
          className={`hover:text-main-blue transition-all ease-in duration-200 ${
            isMenuVisible && "hidden"
          }`}
        />
      </button>
    </div>
  );
};

export default MobileNavigation;
