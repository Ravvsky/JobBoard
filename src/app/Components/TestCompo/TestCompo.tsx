"use client";

import { getUserData, logoutUser } from "@/app/_actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TestCompo = () => {
  const router = useRouter();

  const [userData, setUserData] = useState();
  useEffect(() => {
    getUserData().then((res) => {
      setUserData(res);
    });
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  const clickHandler = () => {
    logoutUser();
    router.push("sign-up");
  };

  return (
    <div>
      {userData && userData.username}
      <button type="button" onClick={clickHandler}>
        LOG OUT
      </button>
    </div>
  );
};

export default TestCompo;
