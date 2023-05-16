import { Splide, SplideSlide } from "@splidejs/react-splide";
import { CoverSkeleton } from "../../../lib/Skeletons";
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
      aria-label='Movies List'>
      {isLoading
        ? dummy.map((d, i) => (
            <SplideSlide key={i}>
              <CoverSkeleton />
              {/* ignore this "d" not affected anything just because linter dont throw error in production */}
              {d}
            </SplideSlide>
          ))
        : data?.map(({ id, poster_path, release_date, title }, index) => (
            <SplideSlide
              className='group bg-input-only rounded-2xl'
              key={index}>
              <MoviesDetails
                idMovies={id}
                componentCount={index + 1}
                titlePoster={title}
                sourcePoster={poster_path}
                releaseDate={release_date}
              />
            </SplideSlide>
          ))}
    </Splide>
  );
};

export default Movies;
