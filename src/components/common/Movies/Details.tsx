import React from "react";
import Posters from "./Posters";
import { Skeleton } from "@mui/material";

interface MoviesDetailsProps {
  title_poster: string;
  release_date: string;
  source_poster: string;
  component_count: number;
  isLoading: boolean;
}

const MoviesDetails: React.FC<MoviesDetailsProps> = ({
  title_poster,
  release_date,
  source_poster,
  component_count,
  isLoading,
}) => {
  return (
    <div className='group transition-all duration-200 rounded-2xl'>
      <Posters
        title={title_poster}
        date={release_date}
        isLoading={isLoading}
      />
      {/* expand class styling at /poster.css for expand animation  */}
      <div className='relative expand cursor-pointer overflow-y-hidden rounded-2xl'>
        <img
          // css animation style at /poster.css *.shadow-inner-*
          className='shadow-inner'
          src={`https://image.tmdb.org/t/p/original${source_poster}`}
          alt={`posterfor-${title_poster}`}
        />
        {/* box shadow animation styled poster at /poster.css  */}
        <span
          className='z-10 absolute bottom-0 right-0 text-8xl text-transparent font-extrabold p-3'
          style={{ WebkitTextStroke: "2px white" }}>
          {component_count}
        </span>
        <div className='inners'></div>
      </div>
    </div>
  );
};

export default MoviesDetails;
