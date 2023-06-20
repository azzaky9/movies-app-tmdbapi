import "./InfiniteScroll.css";
import { memo } from "react";
import { useMovies } from "@/hooks/useMovies";
import { TMoviesResponse } from "@/components/HomeComponent";

const InfiniteScrol = memo(({ reverse }: { reverse?: boolean }) => {
  const { data } = useMovies<TMoviesResponse>([
    "https://api.themoviedb.org/3/movie/popular?api_key=6ec04232daa57ba5165114bab7c10f0c&language=en-US&page=1",
    "https://api.themoviedb.org/3/movie/popular?api_key=6ec04232daa57ba5165114bab7c10f0c&language=en-US&page=2",
  ]);

  const source = data[0]?.results.concat(data[1]?.results);

  const chooseSource = reverse ? [0, 10] : [10, 20];

  return (
    <article className='wrapper'>
      <div className={`marquee ${reverse ? "marquee--reverse" : null}`}>
        <div className='marquee__group'>
          {source?.slice(chooseSource[0], chooseSource[1]).map((item) => (
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt=''
              className='rounded-xl'
            />
          ))}
        </div>

        <div
          aria-hidden='true'
          className='marquee__group'>
          {source?.slice(chooseSource[0], chooseSource[1]).map((item) => (
            <img
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
