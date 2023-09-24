"use client";

import Button from "@/app/Components/Button/Button";

const ApplySection = () => {
  return (
    <div className="flex gap-[3rem] py-[2rem]">
      <div className="text-[2.4rem] font-medium">Are you intrested? </div>{" "}
      <Button
        type="button"
        className="hidden px-[3.2rem] py-[7px] text-[1.6rem] font-semibold text-[#fff] hover:text-main-gray lg:block"
        onClick={() => {}}
      >
        Apply Now!{" "}
      </Button>
    </div>
  );
};

export default ApplySection;
