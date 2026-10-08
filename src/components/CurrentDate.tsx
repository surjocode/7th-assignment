"use client";

import { useEffect, useState } from "react";

const CurrentDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();

    const banglaDate = today.toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });

    setDate(banglaDate );
  }, []);

  return <p className="text-[10px] text-gray-500 sm:text-xs">{date}</p>;
};

export default CurrentDate;