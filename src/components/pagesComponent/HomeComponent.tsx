import { WhatshotOutlined } from "@mui/icons-material";
import { Stack, Skeleton } from "@mui/material";
import DisplayPopular from "../common/Banner/DisplayPopular";
import Movies from "../common/Movies/Movies";
import LinkAll from "../common/utils/LinkAll";
import { StructuredReponseSource } from "@/types";
import { useContext } from "react";
import { MoviesContext } from "@/context/MoviesContext";
import { SkeletonText } from "@/lib/Skeletons";

export interface TMoviesResponse {
  page: number;
  results: StructuredReponseSource[];
  total_pages: number;
}

const HomeComponent = function HomeComponent() {
  const { popularMovies, topRatedMovies, isLoading } = useContext(MoviesContext);

  const renderSkeletonLoadBanner = (
    <div className='w-[50%]'>
      <SkeletonText
        count={5}
        size='18px'
        skeletonSizeList={["100%", "75%", "80%", "50%", "75%"]}
      />
      <Skeleton
        sx={{ mx: 1 }}
        animation='wave'
        width={240}
        height={42}
      />
    </div>
  );

  return (
    <Stack
      gap={5}
      sx={{ pt: 2, px: 3, pb: 10 }}>
      <div>
        <div className='flex justify-between pb-8'>
          <h2 className='text-2xl font-semibold px-1'>Popular Now</h2>
          <LinkAll destination='/popular-movies' />
        </div>
        <div
          className={` m-3 ${
            isLoading ? "bg-secondary flex items-end px-7 py-2" : ""
          } bg-opacity-10 h-[680px] md:h-[auto] rounded-2xl  `}>
          {!isLoading ? (
            <DisplayPopular data={popularMovies?.slice(0, 10)} />
          ) : (
            renderSkeletonLoadBanner
          )}
        </div>
      </div>
      <div>
        <div className='flex justify-between py-8 '>
          <h2 className='text-2xl font-semibold px-1'>Top 10 Rated Movies</h2>
        </div>
        <Movies
          data={topRatedMovies?.slice(0, 10)}
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
          data={popularMovies?.slice(0, 10)}
          isLoading={isLoading}
        />
      </div>
    </Stack>
  );
};

export default HomeComponent;
