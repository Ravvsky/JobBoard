"use client";

import getTimeAgo from "@/app/utils/getTimeAgo";
import StatusBadge from "../StatusBadge/StatusBadge";
import TableTitle from "./TableTitle";
import getTimeTo from "@/app/utils/getTimeTo";
import { useState } from "react";
import { get } from "lodash";

const JobListingsTable = ({ jobOffers }: { jobOffers: [] }) => {
  const [sortedJobOffers, setSortedJobOffers] = useState(jobOffers);

  const sortByAttribute = (attribute, isDate = false) => {
    const sortedJobOffersCopy = [...sortedJobOffers];
    sortedJobOffersCopy.sort((a, b) => {
      let valueA = get(a.attributes, attribute);
      let valueB = get(b.attributes, attribute);

      if (isDate) {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return valueA - valueB;
      }

      if (valueA && valueB) {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
      } else if (valueA) {
        return -1;
      } else if (valueB) {
        return 1;
      }

      return 0;
    });

    const isSortedAscending =
      JSON.stringify(sortedJobOffersCopy) === JSON.stringify(sortedJobOffers);

    if (isSortedAscending) sortedJobOffersCopy.reverse();

    setSortedJobOffers(sortedJobOffersCopy);
  };
  return (
    <div className="flex flex-col gap-[1rem]">
      <div className="flex items-center bg-[#212121]">
        <div className="grid w-full grid-cols-6">
          <TableTitle
            title="Job Title"
            showArrow={false}
            onClick={() => sortByAttribute("jobTitle")}
          />
          <TableTitle
            title="Specialization"
            showArrow={false}
            onClick={() => sortByAttribute("specializations[0].name")}
          />
          <TableTitle
            title="Applied"
            showArrow={false}
            onClick={() => sortByAttribute("peopleWhoApplied.length")}
          />
          <TableTitle
            title="Published At"
            showArrow={false}
            onClick={() => sortByAttribute("publishedAt", true)}
          />
          <TableTitle
            title="Remaining Time"
            showArrow={false}
            onClick={() => sortByAttribute("expiryDate", true)}
          />
          <TableTitle
            title="Status"
            showArrow={false}
            onClick={() => sortByAttribute("publishedAt", true)}
          />
        </div>
      </div>{" "}
      {sortedJobOffers.map((jobOffer, index) => (
        <div key={index} className="flex items-center bg-[#212121]">
          <div className="grid w-full grid-cols-6 items-center">
            <TableTitle title={jobOffer.jobTitle} />
            <TableTitle title={jobOffer.specializations[0].name} />
            <TableTitle title={jobOffer.peopleWhoApplied.length} />
            <TableTitle
              title={
                jobOffer.publishedAt !== null
                  ? getTimeAgo(jobOffer.publishedAt)
                  : "Not published"
              }
            />
            <TableTitle title={getTimeTo(jobOffer.expiryDate)} />
            <div className="group flex w-max grow items-center gap-[0.4rem] px-[2.4rem] py-[1.2rem] text-[1.2rem] font-medium text-[#667085] transition-all hover:text-[#bdbdbd]">
              {" "}
              <StatusBadge
                status={jobOffer.publishedAt !== null ? "active" : "inactive"}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobListingsTable;
