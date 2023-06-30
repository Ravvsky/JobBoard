"use client";

import { useState } from "react";
import Button from "../Button/Button";
import MenuItem from "../MenuItem/MenuItem";
import MobileNavigation from "./MobileNavigation/MobileNavigation";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";

const Navigation = () => {
  const buttonClickHandler = () => {
    console.log("");
  };
  //TODO Test component after creating menu functionality on backend
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const loginButtonHandler = () => {
    setIsLoginModalOpen(true);
  };
  const onSignUpLinkClickHandler = () => {
    setIsLoginModalOpen(false);
  };
  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between bg-main-gray py-[2.8rem] text-[3.6rem] font-bold">
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
      <div className="flex gap-[2rem]">
        <Button
          type="button"
          onClick={buttonClickHandler}
          className="hidden lg:block"
        >
          Post a job
        </Button>

        <Button
          type="button"
          onClick={loginButtonHandler}
          className="hidden lg:block"
        >
          Log in
        </Button>

        <Modal
          childrenClassName="w-1/4"
          className="items-center justify-center"
          isOpen={isLoginModalOpen}
          closeModal={() => {
            setIsLoginModalOpen(false);
          }}
        >
          <LoginForm onSignUpLinkClick={onSignUpLinkClickHandler} />
        </Modal>
      </div>
      <MobileNavigation />
    </nav>
  );
};

export default Navigation;
