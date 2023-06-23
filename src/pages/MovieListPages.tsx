import { useState, useRef, useEffect } from "react";
import MoviesDetails from "@/components/common/Movies/MoviesDetails";
import { CoverSkeleton } from "@/lib/Skeletons";
import { StructuredReponseSource } from "@/types";
import axios, { AxiosResponse } from "axios";

const MovieListPages = () => {
  const [page, setPage] = useState(1);
  const [movieFetcher, setMovieFetcher] = useState<StructuredReponseSource[]>([]);
  const dummy = new Array(5).fill("");
  const loadRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(true);
            axios
              .get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${
                  import.meta.env.VITE_API_KEY
                }&language=en-US&page=${page}`
              )
              .then((res: AxiosResponse<{ results: StructuredReponseSource[] }>) => {
                const result = res.data.results;
                setMovieFetcher((prevState) => [...prevState, ...result]);
              })
              .then(() => setPage(page + 1))
              .catch((e) => console.error(e));
          }
        });
      },
      {
        rootMargin: "-320px 0px",
      }
    );

    if (loadRef.current) {
      observer.observe(loadRef.current);
    }

    // Cleanup: Disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className='p-5 '>
      <h1 className='text-lg font-semibold py-5'>All Movies </h1>
      <div className='grid grid-cols-5 gap-12 h-[1000px] overflow-y-scroll'>
        {movieFetcher?.map((item, index) => (
          <div
            className='relative h-[320px]'
            key={index}>
            <MoviesDetails
              key={index}
              componentCount={index + 1}
              idMovies={item.id}
              titlePoster={item.title}
              sourcePoster={item.poster_path}
              releaseDate={item.release_date}
              genreList={item.genre_ids}
            />
          </div>
        ))}
        {page !== 4 ? (
          <div
            className='flex gap-8'
            ref={loadRef}>
            {dummy.map((d, i) => (
              <div key={i}>
                <CoverSkeleton />
                {/* ignore this "d" not affected anything just because linter dont throw error in production */}
                {d}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MovieListPages;
