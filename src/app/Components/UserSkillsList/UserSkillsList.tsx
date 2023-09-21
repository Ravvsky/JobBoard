"use client";
import { SetStateAction, useEffect, useState } from "react";
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import { Technology } from "@/app/types/Technology";
import SkillModal from "./SkillModal";
import SkillBadge from "./SkillBadge";
const UserSkillsList = ({
  technologies,
  userId,
}: {
  technologies: Technology[];
  userId?: number;
}) => {
  const [itemsWidth, setItemsWidth] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  useEffect(() => {
    setItemsWidth(technologies.length <= 5 ? "w-[60%]" : "w-full");
  }, [technologies]);

  const [items, setItems] = useState(technologies);

  const updateUserSkills = (data: SetStateAction<Technology[]>) => {
    setItems(data);
  };
  return (
    <DashboardContainer
      title="My current skills"
      className=" flex h-[30rem] flex-col justify-start"
      onClick={
        userId
          ? () => {
              setIsLoginModalOpen(true);
            }
          : undefined
      }
    >
      <div className="flex  grow  items-center">
        <div
          className={`mx-auto flex w-full flex-wrap justify-center gap-[2rem] ${itemsWidth} `}
        >
          {items.map((item, index) => (
            <SkillBadge item={item.name} key={index} />
          ))}
        </div>
      </div>
      {userId && (
        <SkillModal
          technologies={technologies}
          userId={userId}
          isOpen={isLoginModalOpen}
          closeModal={() => setIsLoginModalOpen(false)}
          updateSkills={updateUserSkills}
        />
      )}
    </DashboardContainer>
  );
};

export default UserSkillsList;
