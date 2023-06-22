import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useMovies } from "@/hooks/useMovies";
import CardWithDetail from "@/components/common/Card/CardWithDetail";
import Movies from "./common/Movies/Movies";

const ShowDetail = () => {
  const { moviesId } = useParams();

  const { isLoading, movie, movieTrailer, movieSimiliar } = useMovies(moviesId);

  const findKeyTrailer = () => {
    const findKey = movieTrailer.find((item) => item.type === "Trailer");

    return findKey?.key;
  };

  const key = findKeyTrailer();

  return (
    <div className='p-10'>
      <ReactPlayer
        width='100%'
        height={760}
        url={`https://www.youtube.com/watch?v=${key}`}
        controls={true}
        playing={true}
        loop={true}
      />
      <CardWithDetail
        data={movie}
        size='max-h-[380px]'
        transparent
      />
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
