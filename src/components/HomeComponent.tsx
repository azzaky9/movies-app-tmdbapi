import { memo } from "react";
import { useMovies } from "../hooks/useMovies";
import { WhatshotOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import DisplayPopular from "./common/Banner/DisplayPopular";
import Movies from "./common/Movies/Movies";
import LinkAll from "./common/utils/LinkAll";
import { StructuredReponseSource } from "@/types";

export interface TMoviesResponse {
  page: number;
  results: StructuredReponseSource[];
  total_pages: number;
}

const HomeComponent = memo(function HomeComponent() {
  const key = import.meta.env.VITE_API_KEY;

  const { data, isLoading } = useMovies<TMoviesResponse>([
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&page=1`,
  ]);

  return (
    <Stack
      gap={5}
      sx={{ p: 6 }}>
      <div>
        <div className='flex justify-between pb-8'>
          <h2 className='text-2xl font-semibold px-1'>Popular Now</h2>
          <LinkAll destination='/popular-movies' />
        </div>
        <DisplayPopular
          isLoading={isLoading}
          data={data[0]?.results?.slice(0, 6)}
        />
      </div>
      <div>
        <div className='flex justify-between py-8 '>
          <h2 className='text-2xl font-semibold px-1'>Top 10 Rated Movies</h2>
        </div>
        <Movies
          data={data[1]?.results?.slice(0, 10)}
          isLoading={isLoading}
        />
      </div>
      <div>
        <div className='flex justify-between py-8 '>
          <h2 className='text-2xl font-semibold px-1'>
            Trending Movies <WhatshotOutlined className='text-accent' />
          </h2>
          <LinkAll destination='/trending-movies' />
        </div>
        <Movies
          data={data[0]?.results?.slice(0, 10)}
          isLoading={isLoading}
        />
      </div>
    </Stack>
  );
});

export default HomeComponent;
