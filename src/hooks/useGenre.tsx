import { useEffect, useState, useCallback } from "react";

export const useGenre = (lists: (number | string)[]) => {
  const [genreList, setGenreList] = useState<{ id: number; name: string }[]>([]);
  const url =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=6ec04232daa57ba5165114bab7c10f0c";

  const getGenre = useCallback(async () => {
    const res = await fetch(url);
    const data = await res.json();
    setGenreList(data.genres);
  }, [genreList]);

  useEffect(() => {
    getGenre();
  }, []);

  const genreNames = lists?.map((id) => {
    const valueFromArr = genreList?.find((item) => item.id === id)?.name;

    return valueFromArr;
  });

  return { genreNames };
};
