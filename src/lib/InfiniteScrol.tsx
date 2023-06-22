import "./InfiniteScroll.css";
import { memo } from "react";
import { StructuredReponseSource } from "@/types";

interface TInfiniteScrollProps {
  reverse?: boolean;
  dataPoster: StructuredReponseSource[];
}

const InfiniteScrol: React.FC<TInfiniteScrollProps> = memo(({ reverse, dataPoster }) => {
  return (
    <article className='wrapper'>
      <div className={`marquee ${reverse ? "marquee--reverse" : null}`}>
        <div className='marquee__group'>
          {dataPoster?.slice(0, 10).map((item, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt=''
              className='rounded-xl'
            />
          ))}
        </div>

        <div
          aria-hidden='true'
          className='marquee__group'>
          {dataPoster?.slice(10, 20).map((item, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt=''
              className='rounded-3xl'
            />
          ))}
        </div>
      </div>
    </article>
  );
});

export default InfiniteScrol;
