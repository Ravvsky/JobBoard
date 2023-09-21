"use server";
import { cookies } from "next/headers";
import { MeiliSearch } from "meilisearch";

export async function fetchJobOffersAction(filters?: string) {
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
    },
  ).then((response) => response.json());

  return data.data;
}

export async function loginUser(userData: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  const USERS_API_TOKEN = process.env.USERS_API_TOKEN;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const modifiedUserData = {
    identifier: userData.email,
    password: userData.password,
  };
  const currentDate = new Date();

  const expirationDate = () => {
    if (userData.rememberMe) {
      return new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    }
  };

  const data = await fetch(`${BACKEND_URL}/api/auth/local`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(modifiedUserData),
    headers: {
      Authorization: `Bearer ${USERS_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  cookies().set({
    name: "authToken",
    value: data.jwt,
    httpOnly: true,
    expires: expirationDate(),
    path: "/",
  });
  return data;
}

export async function getUserData() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const API_TOKEN = process.env.API_TOKEN;

  const userToken = cookies().get("authToken");
  if (!userToken) {
    throw new Error("User token is missing or undefined.");
  }
  const data = await fetch(`${BACKEND_URL}/api/users/me?populate=*`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken.value}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      const data = await fetch(
        `${BACKEND_URL}/api/users/${res.id}?populate=*`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res.json());
      return data;
    });
  return data;
}

export async function logoutUser() {
  cookies().set({
    name: "authToken",
    value: "",
    expires: new Date(),
    path: "/",
  });
}

export async function userForgotPassword(email: string) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const USERS_API_TOKEN = process.env.USERS_API_TOKEN;

  const data = await fetch(`${BACKEND_URL}/api/auth/forgot-password`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      Authorization: `Bearer ${USERS_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  return data;
}

export async function userResetPassword(passwordData: {
  password: string;
  passwordConfirmation: string;
  code: string;
}) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const USERS_API_TOKEN = process.env.USERS_API_TOKEN;
  const data = await fetch(`${BACKEND_URL}/api/auth/reset-password`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(passwordData),
    headers: {
      Authorization: `Bearer ${USERS_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  return data;
}

export async function userRegister(userData: {
  email: string;
  password: string;
}) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const USERS_API_TOKEN = process.env.USERS_API_TOKEN;

  const modifiedData = {
    email: userData.email,
    username: userData.email,
    password: userData.password,
  };
  const data = await fetch(`${BACKEND_URL}/api/auth/local/register`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(modifiedData),
    headers: {
      Authorization: `Bearer ${USERS_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())

    .catch((error) => {
      return { error: error.cause.code };
    });

  return data;
}

export async function isEmailTaken(email: string) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const USERS_API_TOKEN = process.env.USERS_API_TOKEN;

  const data = await fetch(
    `${BACKEND_URL}/api/users?filters[$and][0][email][$eq]=${email}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${USERS_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.length > 0) {
        return true;
      }

      return false;
    })
    .catch((error) => {
      return { error: error.code };
    });

  return data;
}

export async function updateProfile<T>({
  id,
  fieldToUpdate,
  dataToUpdate,
}: {
  id: number;
  fieldToUpdate: string;
  dataToUpdate: T;
}): Promise<void | { error: string }> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const USERS_API_TOKEN = process.env.USERS_API_TOKEN;
  const data = await fetch(`${BACKEND_URL}/api/users/${id}`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${USERS_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ [fieldToUpdate]: dataToUpdate }),
  })
    .then((response) => response.json())
    .catch((error) => {
      return { error: error.code };
    });

  return data;
}

export async function uploadFile({ formData, userId }) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const UPLOAD_TOKEN = process.env.UPLOAD_TOKEN;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${UPLOAD_TOKEN}`);

  const data = await fetch(`${BACKEND_URL}/api/upload`, {
    method: "POST",
    cache: "no-store",
    headers: headers,
    body: formData,
  })
    .then((response) => response.json())
    .then((res) =>
      updateProfile({ id: userId, fieldToUpdate: "avatar", dataToUpdate: res }),
    )
    .catch((error) => {
      return { error: error.code };
    });

  return data;
}

export async function getItemsInCollection(
  collection: string,
  query: string,
  attributesToSearchOn?: string,
) {
  const MEILISEARCH_URL = process.env.NEXT_PUBLIC_MEILISEARCH_URL;
  const MEILISEARCH_KEY = process.env.MEILISEARCH_KEY;
  if (MEILISEARCH_URL === undefined || MEILISEARCH_URL === "") {
    throw Error("MEILISEARCH_URL variable is undefined or is an empty string");
  }
  const meiliSearch = new MeiliSearch({
    host: MEILISEARCH_URL,
    apiKey: MEILISEARCH_KEY,
  });
  try {
    const searchOptions = attributesToSearchOn
      ? { attributesToSearchOn: [attributesToSearchOn] }
      : undefined;
    const result = await meiliSearch
      .index(collection)
      .search(query, searchOptions);
    return result;
  } catch (error) {
    console.error("Error performing search:", error);
    throw error;
  }
}

export async function getUserBySlug({ slug }: { slug: string }) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const USERS_API_TOKEN = process.env.USERS_API_TOKEN;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${USERS_API_TOKEN}`);

  const data = await fetch(
    `${BACKEND_URL}/api/slugify/slugs/user/${slug}?populate=*`,
    {
      method: "GET",
      cache: "no-store",
      headers: headers,
    },
  )
    .then((response) => response.json())

    .catch((error) => {
      return { error: error.code };
    });

  return data;
}
