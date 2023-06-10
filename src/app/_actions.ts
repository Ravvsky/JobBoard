"use server";
import { cookies } from "next/headers";

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

export async function loginUser(userData) {
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
  console.log(data);
  return data;
}

export async function getUserData() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const userToken = cookies().get("authToken");

  const data = await fetch(`${BACKEND_URL}/api/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken.value}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

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

export async function userResetPassword(passwordData) {
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
