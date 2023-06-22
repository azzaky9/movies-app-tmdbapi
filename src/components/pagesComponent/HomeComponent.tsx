import { WhatshotOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import DisplayPopular from "../common/Banner/DisplayPopular";
import Movies from "../common/Movies/Movies";
import LinkAll from "../common/utils/LinkAll";
import { StructuredReponseSource } from "@/types";
import { useContext } from "react";
import { MoviesContext } from "@/context/MoviesContext";

export interface TMoviesResponse {
  page: number;
  results: StructuredReponseSource[];
  total_pages: number;
}

const HomeComponent = function HomeComponent() {
  const { popularMovies, topRatedMovies, isRequestDone } = useContext(MoviesContext);

  return (
    <Stack
      gap={5}
      sx={{ pt: 2, px: 3, pb: 10 }}>
      <div>
        <div className='flex justify-between pb-8'>
          <h2 className='text-2xl font-semibold px-1'>Popular Now</h2>
          <LinkAll destination='/popular-movies' />
        </div>
        <DisplayPopular
          data={popularMovies?.slice(0, 10)}
          isLoading={isRequestDone}
        />
      </div>
      <div>
        <div className='flex justify-between py-8 '>
          <h2 className='text-2xl font-semibold px-1'>Top 10 Rated Movies</h2>
        </div>
        <Movies
          data={topRatedMovies?.slice(0, 10)}
          isLoading={isRequestDone}
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
          data={popularMovies?.slice(0, 10)}
          isLoading={isRequestDone}
        />
      </div>
    </Stack>
  );
};

export default HomeComponent;
