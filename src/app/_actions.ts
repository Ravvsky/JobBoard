"use server";

export async function fetchJobOffersAction(filters?: any) {
  const API_TOKEN = process.env.API_TOKEN;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const data = await fetch(
    `${BACKEND_URL}/api/job-offers?${
      filters && filters.length > 0 && filters
    }&populate[company][populate][0]=logo&populate[locations][populate][0]=locations&populate[seniority][populate][0]=seniority&populate[technologies][populate][0]=logo`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());

  return data.data;
}
