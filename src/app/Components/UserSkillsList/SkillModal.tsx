"use client";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import SkillItem from "./SkillItem";
import { getItemsInCollection, updateProfile } from "@/app/_actions";
import { Technology } from "@/app/types/Technology";
import SkillSearch from "./SkillSearch";

const SkillModal = ({
  technologies,
  isOpen,
  closeModal,
  userId,
  updateSkills,
}: {
  technologies: Technology[];
  userId: number;
  isOpen: boolean;
  closeModal: () => void;
  updateSkills: (newTechnologies: Technology[]) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundTechnologies, setFoundTechnologies] = useState<Technology[]>([]);
  const [items, setItems] = useState(technologies);

  const filteredSkills =
    searchTerm.length > 0 &&
    foundTechnologies?.filter(
      (technology) =>
        !items.some(
          (item: { name: string }) =>
            item.name.toLowerCase() === technology.name.toLowerCase(),
        ),
    );

  const updateSkillsListAndProfile = (
    item: Technology | string,
    action: "ADD" | "REMOVE",
  ) => {
    let newItems: Technology[] = [];

    if (action === "ADD") {
      newItems = [...items, item as Technology];
    } else if (action === "REMOVE") {
      newItems = items.filter((i: { name: string }) => i.name !== item);
    }

    setItems(newItems);
    updateSkills(newItems);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getItemsInCollection(
          "technology",
          searchTerm,
          "name",
        );

        const technologies: Technology[] = result.hits.map((hit) => ({
          id: hit.id,
          createdAt: hit.createdAt,
          description: hit.description,
          job_offers: hit.job_offers,
          logo: hit.logo,
          name: hit.name,
          publishedAt: hit.publishedAt,
          updatedAt: hit.updatedAt,
        }));

        setFoundTechnologies(technologies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (searchTerm.length > 0) {
      fetchData();
    }
  }, [searchTerm]);

  useEffect(() => {
    updateProfile({
      id: userId,
      fieldToUpdate: "technologies",
      dataToUpdate: items.map((item: { id: number }) => item.id),
    });
  }, [items, userId]);
  return (
    <Modal
      className="items-center justify-center"
      isOpen={isOpen}
      childrenClassName="w-1/3"
      closeModal={closeModal}
    >
      <div className="rounded-[5rem]  bg-light-gray p-[3rem] shadow-md shadow-light-blue">
        <div className="pb-[3rem] font-semibold text-[2rme]">
          Edit your current skills
        </div>

        <SkillSearch
          setSearchTerm={setSearchTerm}
          filteredSkills={filteredSkills}
          updateSkillsListAndProfile={updateSkillsListAndProfile}
        />

        <div className="flex flex-col gap-[1rem] pt-[2rem]">
          {items.map((item: { name: string }, index: number) => (
            <SkillItem
              item={item.name}
              key={index}
              onRemove={() => {
                updateSkillsListAndProfile(item.name, "REMOVE");
              }}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};
export default SkillModal;
