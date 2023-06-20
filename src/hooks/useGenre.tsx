import { useContext } from "react";
import { MoviesContext } from "@/context/MoviesContext";

export const useGenre = (lists: (number | string)[]) => {
  const { genre } = useContext(MoviesContext);

  const genreNames = lists?.map((id) => {
    const valueFromArr = genre?.find((g) => g.id === id)?.name;

    return valueFromArr;
  });

  return { genreNames };
};
