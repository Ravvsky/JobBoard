"use client";
import { Technology } from "@/app/types/Technology";
import Input from "../atoms/Input/Input";
import { Dispatch, SetStateAction } from "react";

const SkillSearch = ({
  setSearchTerm,
  filteredSkills,
  updateSkillsListAndProfile,
}: {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  filteredSkills: false | Technology[];
  updateSkillsListAndProfile: (
    filteredSkill: string | Technology,
    action: "ADD" | "REMOVE",
  ) => void;
}) => {
  return (
    <>
      <Input
        name={"skill"}
        type={"text"}
        placeholder={"Search skill"}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      {filteredSkills && (
        <div className="flex flex-col gap-[1rem] rounded-[2rem] bg-[#858585] p-[2rem]">
          {filteredSkills.map((filteredSkill, index: number) => (
            <div
              key={index}
              className="bg-blueish-gray p-[1rem] text-black"
              onClick={() => {
                updateSkillsListAndProfile(filteredSkill, "ADD");
              }}
            >
              {filteredSkill.name}
            </div>
          ))}
          {filteredSkills.length === 0 && (
            <div>
              There is no matching skill or you already added it to your profile
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SkillSearch;
