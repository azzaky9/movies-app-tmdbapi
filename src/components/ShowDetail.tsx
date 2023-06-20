import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useMovies } from "@/hooks/useMovies";
import Movies from "./common/Movies/Movies";

const ShowDetail = () => {
  const { moviesId } = useParams();

  const { isLoading, movie, trailerPath, movieSimiliar } = useMovies(moviesId);

  return (
    <div className='p-10'>
      <ReactPlayer
        width='100%'
        height={760}
        url={trailerPath}
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
            {movie?.production_companies?.map((company, index) => {
              if (company.logo_path) {
                return (
                  <li
                    key={index + 1}
                    className='p-3 bg-zinc-800 grid place-content-center transition duration-300 rounded-lg filter grayscale hover:grayscale-0 hover:cursor-pointer hover:bg-white'>
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
        {movie?.genres?.map((genre, index) => (
          <li
            key={index + 1}
            className='px-4 py-2 rounded-full text-sm bg-input-only ring-secondary ring-1 hover:cursor-pointer'>
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
          data={movieSimiliar}
        />
      </div>
    </div>
  );
};

export default ShowDetail;
