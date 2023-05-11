"use client";
import Image from "next/image";

import LocationIcon from "../../assets/icons/location.svg";
import DollarIcon from "../../assets/icons/dollar.svg";
import HeartIcon from "../../assets/icons/heart.svg";

import { JobPosting } from "@/app/types/JobPosting";
import { useState } from "react";
import Link from "next/link";

import getTimeAgo from "@/app/utils/getTimeAgo";
import RoundedImage from "../atoms/RoundedImage/RoundedImage";
import Badge from "../atoms/Badge/Badge";
const JobOfferTile = ({ attributes }: { attributes: JobPosting }) => {
  const {
    jobTitle,
    fromSalary,
    toSalary,
    employmentType,
    employmentMode,
    linkToExternalApplication,
    publishedAt,
    company,
    technologies,
    seniority,
    locations,
  } = attributes;

  const [isJobOfferFavourite, setIsJobOfferFavourite] = useState(false);
  const addJobOfferToFavourite = () => {
    setIsJobOfferFavourite(!isJobOfferFavourite);
  };

  const companyLogoUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${company.data.attributes.logo.data.attributes.url}`;

  const getLocationDisplayText = (locations: string | any[]) => {
    if (locations.length === 0) {
      return "Remote only";
    } else if (locations.length === 1) {
      return locations[0].location;
    } else {
      return `${locations[0].location} and ${locations.length - 1} others`;
    }
  };

  const heartIconFill = isJobOfferFavourite
    ? "fill-main-blue"
    : "fill-transparent";

  return (
    <div className="col-span-3 flex h-fit flex-col gap-[2rem] rounded-[1rem] bg-light-gray p-[2rem]">
      <div className="flex flex-col gap-[1rem]">
        <div className="flex items-center justify-between">
          <Image src={companyLogoUrl} alt="" width={120} height={120} />
          <button type="button" onClick={addJobOfferToFavourite}>
            <HeartIcon
              aria-label="add to favourite"
              className={`stroke-main-blue ${heartIconFill} stroke-[20px]	transition-all duration-200 ease-in  hover:fill-main-blue	`}
            />
          </button>
        </div>

        <div className="flex items-baseline justify-between font-semibold">
          {jobTitle}
          <div className="rounded-[20rem] bg-main-gray px-[1rem] text-[1.2rem] font-normal text-main-blue">
            {getTimeAgo(publishedAt)}
          </div>
        </div>

        <div className="flex flex-col gap-[0.5rem]">
          <div className="flex items-center gap-[0.4rem] text-[1.2rem]">
            <LocationIcon width={11} />
            {getLocationDisplayText(locations)}
          </div>

          <div className=" flex items-center gap-[0.4rem] text-[1.2rem]">
            <DollarIcon width={11} />
            {`From $${fromSalary.toFixed(2)} to $${toSalary.toFixed(2)}`}
          </div>
        </div>
      </div>

      <div className="flex gap-[1rem]">
        <Badge> {seniority.data.attributes.seniority}</Badge>
        <Badge> {employmentMode}</Badge>
        <Badge> {employmentType}</Badge>
      </div>

      <div className="flex gap-[1rem]">
        {technologies.data.map((technology, index) => {
          const technologyLogoUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${technology.attributes.logo.data.attributes.url}`;
          return (
            <RoundedImage
              key={index}
              src={technologyLogoUrl}
              alt={technology.attributes.name}
              width={140}
              height={140}
            />
          );
        })}
      </div>

      <Link
        href={linkToExternalApplication || "#"}
        className="text-left font-semibold text-main-blue transition-all hover:text-white"
      >
        Apply now
      </Link>
    </div>
  );
};

export default JobOfferTile;
