"use client";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";

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
          className={`bg-main-blue fixed h-full top-0 p-[2rem] min-w-[20rem] flex justify-end items-start transition-all ease-in duration-200 ${
            isMenuVisible ? "right-0" : "-right-full"
          }`}
        >
          <button
            type="button"
            onClick={hamburgerClickHandler}
            className="text-[2.5rem]"
          >
            X
          </button>
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
