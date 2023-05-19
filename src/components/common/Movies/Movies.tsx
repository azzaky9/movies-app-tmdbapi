// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { CoverSkeleton } from "../../../lib/Skeletons";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "./MoviesInfo.css";

import MoviesDetails from "./MoviesDetails";
import { MoviesDataTypes } from "../../../types";

const Movies: React.FC<MoviesDataTypes> = ({ data, isLoading }) => {
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
        : data?.map(({ id, poster_path, release_date, title, genre_ids }, index) => (
            <SplideSlide
              className='group bg-input-only rounded-2xl'
              key={index}>
              <MoviesDetails
                idMovies={id}
                componentCount={index + 1}
                titlePoster={title}
                sourcePoster={poster_path}
                releaseDate={release_date}
                genreList={genre_ids}
              />
            </SplideSlide>
          ))}
    </Splide>
  );
};

export default Movies;
