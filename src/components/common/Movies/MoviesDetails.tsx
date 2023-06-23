import React from "react";
import { InnerShadow } from "@/components/common/utils";
import MoviesInfo from "./MoviesInfo";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface MoviesDetailsProps {
  idMovies: number | string;
  titlePoster: string;
  releaseDate: string;
  sourcePoster: string;
  componentCount: number;
  genreList: (string | number)[];
}

const MoviesDetails: React.FC<MoviesDetailsProps> = ({
  idMovies,
  titlePoster,
  releaseDate,
  sourcePoster,
  componentCount,
  genreList,
}) => {
  return (
    <div className='group transition-all duration-200 rounded-2xl sm:h-[200px] sm:w-[120px]'>
      <MoviesInfo
        genre={genreList}
        id={idMovies}
        title={titlePoster}
        date={releaseDate}
      />
      {/* expand class styling at /poster.css for expand animation  */}
      <div className='relative expand cursor-pointer overflow-y-hidden rounded-2xl'>
        <LazyLoadImage
          effect='blur'
          className='shadow-inner'
          src={`https://image.tmdb.org/t/p/original${sourcePoster}`}
          alt={`posterfor-${titlePoster}`}
        />

        {/* box shadow animation styled poster at /poster.css  */}
        <span
          className='z-10 absolute bottom-0 right-0 text-8xl text-transparent font-extrabold p-3'
          style={{ WebkitTextStroke: "2px white" }}>
          {componentCount}
        </span>
        <InnerShadow model='portrait' />
      </div>
    </div>
  );
};

export default MoviesDetails;
