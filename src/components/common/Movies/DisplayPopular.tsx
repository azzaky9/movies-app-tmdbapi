// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { MoviesDataTypes } from "../../../types";
import { EastOutlined } from "@mui/icons-material";
import { LandscapeShadow } from "../utils/InnerShadow";

import DisplayInfo from "./DisplayInfo";
import "@splidejs/react-splide/css";
import "./DisplayPopular.css";

const DisplayPopular: React.FC<MoviesDataTypes> = ({ data }) => {
  return (
    <Splide
      options={{
        rewind: true,
        type: "loop",
        autoplay: true,
        pagination: false,
        interval: 3400,
      }}
      tag='section'
      aria-label='popular_slide'
      hasTrack={false}>
      <SplideTrack>
        {data?.map(({ id, backdrop_path, release_date, title, vote_average, genre_ids }, index) => (
          <SplideSlide key={index}>
            <div className='group'>
              <img
                className='w-full h-auto rounded-2xl'
                src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                alt={`poster-for-${id}`}
              />
              <LandscapeShadow />
              <DisplayInfo
                date={release_date}
                title={title}
                rating={vote_average}
                genre={genre_ids}
              />
            </div>
          </SplideSlide>
        ))}
      </SplideTrack>

      <div className='splide__arrows wrapper__splide--custom absolute w-[130px] right-10 bottom-14'>
        <button className='splide__arrow splide__arrow--prev splide__custom--style '>
          <EastOutlined />
        </button>
        <button className='splide__arrow splide__arrow--next splide__custom--style'>
          <EastOutlined />
        </button>
      </div>
    </Splide>
  );
};

export default DisplayPopular;
