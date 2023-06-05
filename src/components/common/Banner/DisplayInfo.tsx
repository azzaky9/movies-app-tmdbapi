import { InfoPropTypes } from "@/types";
import { BookmarkButton } from "@/components/common/Movies/MoviesInfo";
import { PlayArrow } from "@mui/icons-material";
import { Title, Genre } from "@/components/common/utils";
import imdbLogo from "/imdb-logo.svg";

const DisplayInfo: React.FC<InfoPropTypes> = ({ date, title, rating, genre }) => {
  return (
    <>
      <div className='w-[400px] text-white p-10 absolute bottom-0 z-40'>
        <Genre
          lists={genre.slice(0, 2)}
          model='landscape'
        />
        <Title
          date={date}
          title={title}
          // pixel ratio
          size='large'
        />
        <div className='flex gap-2'>
          <button className='relative bg-accent text-black px-4 py-2 rounded-lg transition-all duration-300 font-semibold flex items-center gap-1 shadow-md hover:-translate-y-[0.18rem] active:translate-y-0'>
            <PlayArrow />
            Detail Movie
          </button>
          <BookmarkButton />
        </div>
      </div>
      <div className='absolute top-0 right-0 px-10 py-8'>
        {rating}/10 ratings{" "}
        <img
          className='inline-block'
          src={imdbLogo}
          alt='imdb_logo'
        />
      </div>
    </>
  );
};

export default DisplayInfo;
