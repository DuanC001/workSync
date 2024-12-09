import { useState, useEffect } from "react";

const useFetch = (url, method = "GET", options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(url, {
        method,
        contentType: "application/json",
        ...options,
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Error fetching data");
      }
      const json = await res.json();
      console.log(json);
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect(()=>{
  //     fetchData();
  // },[url,method]);

  return { data, isLoading, error, fetchData };
};

export default useFetch;
