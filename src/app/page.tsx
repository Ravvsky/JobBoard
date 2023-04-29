import { Inter } from "next/font/google";
import JobOfferTile from "./Components/JobOfferTile/JobOfferTile";
import { Key } from "react";
import { JobPosting } from "./types/JobPosting";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const API_TOKEN = process.env.API_TOKEN;
  const fetchJobOffers = await fetch(
    `http://localhost:1337/api/job-offers?populate[technologies][populate]=*&populate[company][populate]=*&populate[locations]=*&populate[seniority]=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());

  return (
    <main className="grid grid-cols-12 ">
      <div className="col-span-3 hidden bg-[#ff0000] sm:block">TTT</div>
      <div className="col-span-12 grid grid-cols-3 gap-[2rem] sm:col-span-9 md:grid-cols-6 xl:grid-cols-9 ">
        {fetchJobOffers.data.map(
          (offer: { id: Key | null | undefined; attributes: JobPosting }) => {
            return (
              <JobOfferTile key={offer.id} attributes={offer.attributes} />
            );
          }
        )}
      </div>
    </main>
  );
}
