"use client";
import { useState } from "react";
import RoundedImage from "../../atoms/RoundedImage/RoundedImage";
import { useAppDispatch } from "@/redux/hooks";
import { setFilter } from "@/redux/features/jobOfferFilters";
import { Technology } from "@/app/types/Technology";

const FilterTechnologiesList = ({
  technologies,
  category,
}: {
  technologies: { attributes: Technology }[];
  category: string;
}) => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [clickedNames, setClickedNames] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const clickHandler = (name: string) => {
    dispatch(setFilter({ category: category, value: name }));

    if (clickedNames.includes(name)) {
      setClickedNames(
        clickedNames.filter((clickedName) => clickedName !== name),
      );
    } else {
      setClickedNames([...clickedNames, name]);
    }
  };

  return (
    <div className="flex flex-wrap gap-[1rem]	">
      {technologies.map((technology) => {
        const technologyName = technology.attributes.name;
        return (
          <RoundedImage
            src={`${BACKEND_URL}${technology.attributes.logo.data.attributes.url}`}
            width={140}
            height={140}
            alt={technologyName}
            key={technologyName}
            className={`cursor-pointer transition-all ${
              clickedNames.includes(technologyName)
                ? "opacity-100"
                : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => {
              clickHandler(technologyName);
            }}
          />
        );
      })}
    </div>
  );
};

export default FilterTechnologiesList;
