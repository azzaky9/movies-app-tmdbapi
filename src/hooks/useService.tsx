import { useState, useCallback } from "react";
import axios from "axios";
import { DetailSourceMovies } from "./useMovies";

export const useService = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchSourceUserHave = async () => {
    setIsLoading(true);

    const config = {
      method: "GET",
      url: "https://api.themoviedb.org/3/account/18942456/watchlist/movies",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWMwNDIzMmRhYTU3YmE1MTY1MTE0YmFiN2MxMGYwYyIsInN1YiI6IjY0M2E2YWZlZTMyOTQzMDU4MGY5YWM3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nNAQQ5lKeE9ASJczWAdkvH0HoK-ZH2nxZHoxefLEeK4",
      },
    };

    const { data }: { data: { results: DetailSourceMovies[] } } = await axios.request(config);

    console.log(data.results);

    setIsLoading(false);

    return data.results;
  };

  const postWatchList = useCallback(async (id: number) => {
    console.log("clicked");

    const config = {
      method: "POST",
      url: `https://api.themoviedb.org/3/account/18942456/watchlist`,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWMwNDIzMmRhYTU3YmE1MTY1MTE0YmFiN2MxMGYwYyIsInN1YiI6IjY0M2E2YWZlZTMyOTQzMDU4MGY5YWM3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nNAQQ5lKeE9ASJczWAdkvH0HoK-ZH2nxZHoxefLEeK4",
      },
      data: { media_type: "movie", media_id: id, watchlist: true },
    };
    try {
      const response = await axios.request(config);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { postWatchList, isLoading, fetchSourceUserHave };
};
