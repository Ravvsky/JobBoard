import { Inter } from "next/font/google";
import FilterPanel from "./Components/FilterPanel/FilterPanel";
import FilterOptionsList from "./Components/molecules/FilterOptionsList/FilterOptionsList";
import FilterTechnologiesList from "./Components/molecules/FilterTechnologiesList/FilterTechnologiesList";
import RangeSlider from "./Components/RangeSlider/RangeSlider";
import FilterButtonsList from "./Components/molecules/FilterButtonsList/FilterButtonsList";
import JobOfferList from "./Components/JobOfferList/JobOfferList";
const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const API_TOKEN = process.env.API_TOKEN;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchSpecializations = await fetch(
    `${BACKEND_URL}/api/specializations`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
  const fetchSeniorities = await fetch(`${BACKEND_URL}/api/seniorities`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  const fetchTechnologies = await fetch(
    `${BACKEND_URL}/api/technologies?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());

  return (
    <main className="grid grid-cols-12 ">
      <div className="col-span-3 hidden  sm:block">
        <FilterPanel name={"Specializations"}>
          <FilterOptionsList
            options={fetchSpecializations.data}
            category={"specializations"}
          />
        </FilterPanel>
        <FilterPanel name={"Seniorities"}>
          <FilterOptionsList
            options={fetchSeniorities.data}
            category={"seniorities"}
          />
        </FilterPanel>

        <FilterPanel name={"Skills"}>
          <FilterTechnologiesList
            technologies={fetchTechnologies.data}
            category={"technologies"}
          />
        </FilterPanel>
        <FilterPanel name={"Salary"}>
          <RangeSlider min={0} max={30000} />
        </FilterPanel>
        <FilterPanel name={"Work Preference"}>
          <FilterButtonsList />
        </FilterPanel>
      </div>
      <JobOfferList />
    </main>
  );
}
