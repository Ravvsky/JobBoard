"use client";
import { useEffect, useState } from "react";
import JobOfferTile from "../JobOfferTile/JobOfferTile";
import { fetchJobOffersAction } from "@/app/_actions";
import { useAppSelector } from "@/redux/hooks";
import qs from "qs";

const JobOfferList = () => {
  const [options, setOptions] = useState();
  const selector = useAppSelector((state) => state.jobOfferFilters);

  const addFilterToQuery = (
    query: { filters: any },
    key: string,
    value: (string | number)[],
    shouldTransformToLower = false
  ) => {
    if (value) {
      const segments = key.split(".");
      let nestedObj = query.filters;
      segments.forEach((segment, index) => {
        if (index === segments.length - 1) {
          if (shouldTransformToLower) {
            if (Array.isArray(value)) {
              nestedObj[segment] = value.map((v) =>
                typeof v === "string" ? v.toLowerCase() : v
              );
            } else if (typeof value === "string") {
              nestedObj[segment] = value.toLowerCase();
            } else {
              nestedObj[segment] = value;
            }
          } else {
            nestedObj[segment] = value;
          }
        } else {
          nestedObj[segment] = nestedObj[segment] || {};
          nestedObj = nestedObj[segment];
        }
      });
    }
  };

  const queryCreator = () => {
    const query = { filters: {} };

    addFilterToQuery(
      query,
      "fromSalary",
      selector.salary && { $gte: selector.salary[0] }
    );
    addFilterToQuery(
      query,
      "toSalary",
      selector.salary && { $lte: selector.salary[1] }
    );
    addFilterToQuery(
      query,
      "seniority.seniority",
      selector.seniorities && { $eqi: selector.seniorities[0] }
    );
    addFilterToQuery(
      query,
      "specializations.name",
      selector.specializations && { $eqi: selector.specializations }
    );
    addFilterToQuery(
      query,
      "technologies.name",
      selector.technologies && { $in: selector.technologies }
    );
    addFilterToQuery(
      query,
      "employmentMode",
      selector["work-preference"],
      true
    );

    return qs.stringify(query, { encodeValuesOnly: true });
  };
  useEffect(() => {
    async function fetchData() {
      const result = await fetchJobOffersAction(
        Object.keys(selector).length === 0 ? undefined : queryCreator()
      );
      setOptions(result);
    }

    fetchData();
  }, [selector]);

  return (
    <div className="col-span-12 grid grid-cols-3 gap-[2rem] sm:col-span-9 md:grid-cols-6 xl:grid-cols-9 ">
      {options &&
        options.map((offer, index) => {
          return <JobOfferTile key={index} attributes={offer.attributes} />;
        })}
    </div>
  );
};

export default JobOfferList;
