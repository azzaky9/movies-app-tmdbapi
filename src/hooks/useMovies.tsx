import { useState, useEffect, useCallback } from "react";

export const useMovies = function <T>(urls: string[]) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>("");

  const fetchAPI = useCallback(async () => {
    setIsLoading(true);
    try {
      const urlsList = urls.map((url) => fetch(url).then((res) => res.json()));
      const response = await Promise.all(urlsList);
      setData(response);
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  }, [urls]);

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line
  }, []);

  return { data, error, isLoading };
};
