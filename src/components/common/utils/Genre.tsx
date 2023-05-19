import { useEffect, useState, useMemo, useCallback } from "react";

interface GenrePropTypes {
  lists: (string | number)[];
  model: "portrait" | "landscape";
}

const Genre: React.FC<GenrePropTypes> = ({ lists, model }) => {
  const [genreList, setGenreList] = useState<{ id: number; name: string }[]>([]);

  const getGenre = async () => {
    const url =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=6ec04232daa57ba5165114bab7c10f0c";
    const res = await fetch(url);
    const data = await res.json();

    setGenreList(data.genres);
  };

  useEffect(() => {
    getGenre();
  }, []);

  const renderGenre = lists?.map((id) => {
    const valueFromArr = genreList.find((item) => item.id === id);

    return valueFromArr;
  });

  return (
    <ul className={`flex gap-x-2 flex-wrap ${model === "portrait" ? "py-1" : "py-2"} text-sm`}>
      {renderGenre?.map((item) => (
        <li>{item?.name}</li>
      ))}
      &#x2022;
      {model === "landscape" ? <span className='text-accent font-semibold'>Movies</span> : null}
    </ul>
  );
};

export default Genre;
