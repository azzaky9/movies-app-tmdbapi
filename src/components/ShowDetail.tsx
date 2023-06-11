import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useEffect, useState, memo } from "react";
import { useMovies } from "@/hooks/useMovies";
import { StructuredReponseSource } from "@/types";
import { TMoviesResponse } from "./HomeComponent";
import Movies from "./common/Movies/Movies";

interface SourceVideoMovies {
  key: string;
  name: string;
  type: "Trailer" | string;
}

interface ProductionCompany {
  logo_path: string;
  name: string;
  origin_country: string;
}

type GenresObject = {
  id: number;
  name: string;
};

interface DetailSourceMovies extends StructuredReponseSource {
  production_companies: ProductionCompany[];
  tagline: string;
  status: string;
  overview: string;
  genres: GenresObject[];
}

const ShowDetail = memo(() => {
  const key = import.meta.env.VITE_API_KEY;
  const { moviesId } = useParams();
  const { data, isLoading } = useMovies<DetailSourceMovies & TMoviesResponse>([
    `https://api.themoviedb.org/3/movie/${moviesId}?api_key=${key}&anguage=en-US`,
    `https://api.themoviedb.org/3/movie/${moviesId}/similar?api_key=${key}`,
  ]);
  const [sourceVideos, setSourceVideos] = useState<SourceVideoMovies[]>([]);
  const movie: DetailSourceMovies = data[0];
  const similiarMovie: StructuredReponseSource[] = data[1]?.results?.slice(0, 6);

  async function getSourceMovie() {
    fetch(`https://api.themoviedb.org/3/movie/${moviesId}/videos?api_key=${key}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        setSourceVideos(data.results);
      })
      .catch((err) => console.log(err));
  }

  const findKeyTrailer = () => {
    const trailer = sourceVideos?.find((item) => item.type === "Trailer");

    return trailer?.key;
  };

  useEffect(() => {
    getSourceMovie();
  }, []);

  return (
    <div className='p-10'>
      <ReactPlayer
        width='100%'
        height={760}
        url={`https://www.youtube.com/watch?v=${findKeyTrailer()}`}
        controls={true}
        playing={true}
        loop={true}
      />
      <div className='p-10 flex flex-row-reverse gap-10'>
        <div className='w-full flex flex-col gap-5'>
          <h4 className='text-xl font-semibold'>{movie?.title}</h4>
          <span className='mb-2 text-accent'>"{movie?.tagline}"</span>
          <p className='max-w-[90%] '>{movie?.overview}</p>
          <ul className='grid grid-cols-6 gap-4 mt-2'>
            {movie?.production_companies?.map((company) => {
              if (company.logo_path) {
                return (
                  <li className='p-3 bg-zinc-800 grid place-content-center transition duration-300 rounded-lg filter grayscale hover:grayscale-0 hover:cursor-pointer hover:bg-white'>
                    <img
                      className='h-auto'
                      src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                      alt='logo-company-production'
                    />
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <img
          className='max-h-[380px]'
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          alt='poster-review'
        />
      </div>
      <ul className='flex gap-5 px-10'>
        {movie?.genres?.map((genre) => (
          <li className='px-4 py-2 rounded-full text-sm bg-input-only ring-secondary ring-1 hover:cursor-pointer'>
            # {genre.name}
          </li>
        ))}
      </ul>

      <div className='p-5'>
        <h2 className='py-10 px-4 text-lg font-semibold hover:underline hover:text-accent hover:cursor-pointer'>
          # Similiar Movies
        </h2>
        <Movies
          isLoading={isLoading}
          data={similiarMovie}
        />
      </div>
    </div>
  );
});

export default ShowDetail;
