import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { StructuredReponseSource } from "@/types";

interface TrailerMoviesTypes {
  key: string;
  name: string;
  type: "Trailer" | string;
}

interface ProductionCompany {
  logo_path: string;
  name: string;
  origin_country: string;
}

type GenresObject = {
  id: number;
  name: string;
};

export interface DetailSourceMovies extends StructuredReponseSource {
  production_companies: ProductionCompany[];
  tagline: string;
  status: string;
  overview: string;
  genres: GenresObject[];
}

export const useMovies = (id?: number | string) => {
  const key = import.meta.env.VITE_API_KEY;

  const [movie, setMovie] = useState<DetailSourceMovies | null>(null);
  const [movieTrailer, setMovieTrailer] = useState<TrailerMoviesTypes[]>([]);
  const [movieSimiliar, setMovieSimiliar] = useState<StructuredReponseSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSimiliarAndMovies = async () => {
    setIsLoading(true);

    try {
      const getMovie: AxiosResponse<DetailSourceMovies> = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&anguage=en-US`
      );
      setMovie(getMovie.data);

      const trailer: AxiosResponse<{ results: TrailerMoviesTypes[] }> = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`
      );

      setMovieTrailer(trailer.data.results);

      const getSimiliarMovie: AxiosResponse<{ results: StructuredReponseSource[] }> =
        await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}`);

      setMovieSimiliar(getSimiliarMovie.data.results);

      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) console.log(err);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSimiliarAndMovies();
  }, []);

  return { isLoading, movie, movieSimiliar, movieTrailer };
};
