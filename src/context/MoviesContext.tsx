import { createContext, useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

export type GenreTypes = (number | string)[];

export interface InfoPropTypes {
  id: number | string;
  title: string;
  date: string;
  rating?: number | string;
  genre: GenreTypes;
}

interface TMoviesResponse {
  page: number;
  results: StructuredReponseSource[];
  total_pages: number;
}

export interface MoviesDataTypes {
  data: StructuredReponseSource[];
  isLoading: boolean;
}

export interface StructuredReponseSource {
  id: string;
  adult: boolean;
  poster_path: string;
  release_date: string;
  title: string;
  backdrop_path: string;
  vote_average: number;
  genre_ids: GenreTypes;
}

interface TResponseGenres {
  id: number;
  name: string;
}

interface TMoviesContext {
  popularMovies: StructuredReponseSource[];
  topRatedMovies: StructuredReponseSource[];
  genre: TResponseGenres[];
  error: AxiosError;
  isRequestDone: boolean;
}

export const MoviesContext = createContext<TMoviesContext>({} as TMoviesContext);

const key = import.meta.env.VITE_API_KEY;

const endPoint = [
  `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&page=1`,
  `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`,
];

export const SourceMoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFetchingDone, setIsFetchingDone] = useState(false);
  const [sourceMovies, setSourceMovies] = useState<StructuredReponseSource[][]>([]);
  const [genres, setGenres] = useState<TResponseGenres[]>([]);
  const [error, setError] = useState<any | unknown>();

  const getAllSourceMovie = async () => {
    setIsFetchingDone(true);
    try {
      const getSourceMovie = endPoint.map((url) =>
        axios.get(url).then((res: AxiosResponse<TMoviesResponse>) => res)
      );

      const { data }: { data: { genres: TResponseGenres[] } } = await axios.get(endPoint[2]);

      const response = await Promise.all(getSourceMovie);

      const source = response.map((s) => s.data.results);

      setSourceMovies(source);

      setGenres(data.genres);

      setIsFetchingDone(false);
    } catch (err) {
      if (err instanceof AxiosError) setError(err.response?.data);

      setIsFetchingDone(false);
    }
  };

  useEffect(() => {
    getAllSourceMovie();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        topRatedMovies: sourceMovies[1],
        popularMovies: sourceMovies[0],
        genre: genres,
        error: error,
        isRequestDone: isFetchingDone,
      }}>
      {children}
    </MoviesContext.Provider>
  );
};
