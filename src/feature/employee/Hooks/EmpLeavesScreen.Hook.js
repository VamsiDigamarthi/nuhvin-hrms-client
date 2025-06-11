import { useEffect, useState } from "react";
import { getLeavesApi } from "../Services/emp-leaves";

export const useLeavesScreenHook = () => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [leaves, setleaves] = useState([]);
  const [date, setDate] = useState(new Date()?.toISOString()?.split("T")[0]);

  const fetchLeaves = async () => {
    setIsLoading(true);
    const data = await getLeavesApi({ token, date });
    if (data.status) {
      setleaves(data?.apiRes);
    } else {
      setError(data?.errMsg);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLeaves();
  }, [date]);

  return {
    leaves,
    fetchLeaves,
    date,
    setDate,
    error,
    isLoading,
  };
};
