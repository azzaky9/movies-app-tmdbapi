import { memo } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { MoviesDataTypes } from "@/types";
import { EastOutlined } from "@mui/icons-material";
import { InnerShadow } from "@/components/common/utils";

import DisplayInfo from "./DisplayInfo";
import "@splidejs/react-splide/css";
import "./DisplayPopular.css";

const DisplayPopular: React.FC<MoviesDataTypes> = ({ data, isLoading }) => {
  const DisplayValue = memo(() => {
    return (
      <>
        {data?.map(({ id, backdrop_path, release_date, title, vote_average, genre_ids }, index) => (
          <SplideSlide key={index}>
            <div className='group'>
              {isLoading ? (
                <div className='w-full h-[620px] rounded-2xl animate-pulse bg-input-only'></div>
              ) : (
                <img
                  className='w-full h-auto rounded-2xl'
                  src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                  alt={`poster-for-${id}`}
                />
              )}
              {/* <InnerShadow model='landscape' /> */}
              <DisplayInfo
                id={id}
                date={release_date}
                title={title}
                rating={vote_average}
                genre={genre_ids}
              />
            </div>
          </SplideSlide>
        ))}
      </>
    );
  });

  return (
    <Splide
      options={{
        rewind: true,
        pagination: false,
        autoplay: true,
        interval: 4000,
        lazyLoad: true,
        gap: "42px",
      }}
      tag='section'
      aria-label='popular_slide'
      hasTrack={false}>
      <SplideTrack>
        <DisplayValue />
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
