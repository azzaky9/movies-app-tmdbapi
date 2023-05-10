import { Splide, SplideSlide } from "@splidejs/react-splide";
import { SkeletonText, CoverSkeleton } from "../../../lib/Skeletons";
import { Skeleton, Stack } from "@mui/material";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "./posters.css";

import MoviesDetails from "./Details";

interface PropTypes {
  data: {
    id: number;
    adult: boolean;
    poster_path: string;
    release_date: string;
    title: string;
  }[];

  isLoading: boolean;
}

const Movies: React.FC<PropTypes> = ({ data, isLoading }) => {
  const dummy = new Array(4).fill("");

  return (
    <Splide
      options={{
        perPage: 4,
        rewind: true,
        pagination: false,
        gap: "2rem",
      }}
      aria-label='My Favorite Images'>
      {isLoading
        ? dummy.map((d, i) => (
            <SplideSlide key={i}>
              <CoverSkeleton />
              {/* ignore this "d" not affected anything just because linter dont throw error in production */}
              {d}
            </SplideSlide>
          ))
        : data?.map(({ poster_path, release_date, title }, index) => (
            <SplideSlide
              className='group bg-input-only rounded-2xl'
              key={index}>
              <MoviesDetails
                component_count={index + 1}
                title_poster={title}
                source_poster={poster_path}
                release_date={release_date}
                isLoading={isLoading}
              />
            </SplideSlide>
          ))}
    </Splide>
  );
};

export default Movies;
