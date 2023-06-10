import { PlayArrow, BookmarkAddOutlined, KeyboardArrowDown } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { InfoPropTypes } from "@/types";
import { Title } from "@/components/common/utils";
import { useGenre } from "@/hooks/useGenre";
import { useNavigate } from "react-router-dom";

export const BookmarkButton = () => {
  return (
    <button className='bg-black p-2 bg-opacity-40 rounded-lg hover:cursor-pointer'>
      <Tooltip title='Add To Playlist'>
        <BookmarkAddOutlined className='text-accent' />
      </Tooltip>
    </button>
  );
};

const MoviesInfo: React.FC<InfoPropTypes> = ({ title, date, genre, id }) => {
  const { genreNames } = useGenre(genre);
  const navigate = useNavigate();

  const genreText =
    genreNames?.length > 1 ? `${genreNames[0]} / ${genreNames[1]}` : `${genreNames[0]}`;

  return (
    <div className='absolute bottom-0 w-full p-3'>
      <span className='text-accent pb-2'>{genreText}</span>
      <Title
        title={title}
        date={date}
        size='medium'
      />

      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <button
            onClick={() => navigate(`/movies/${id}`)}
            className='smooth-transition bg-accent w-10 h-10 bg-opacity-10 rounded-full hover:bg-opacity-100 hover:cursor-pointer'>
            <Tooltip title='Detail Movies'>
              <PlayArrow className='smooth-transition text-accent hover:text-primary' />
            </Tooltip>
          </button>
          <BookmarkButton />
        </div>
        <div className='bg-white p-2 bg-opacity-10 rounded-lg'>
          <Tooltip title='expand ?'>
            <KeyboardArrowDown className='text-white hover:cursor-pointer' />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default MoviesInfo;
