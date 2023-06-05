import { PlayArrow, BookmarkAddOutlined, KeyboardArrowDown } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { InfoPropTypes } from "@/types";
import { Title, Genre } from "@/components/common/utils";

export const BookmarkButton = () => {
  return (
    <button className='bg-black p-2 bg-opacity-40 rounded-lg hover:cursor-pointer'>
      <Tooltip title='Add To Playlist'>
        <BookmarkAddOutlined className='text-accent' />
      </Tooltip>
    </button>
  );
};

const MoviesInfo: React.FC<InfoPropTypes> = ({ title, date, genre }) => {
  return (
    <div className='absolute bottom-0 w-full p-3'>
      <Genre
        lists={genre}
        model='portrait'
      />
      <Title
        title={title}
        date={date}
        size='medium'
      />

      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <button className='smooth-transition bg-accent w-10 h-10 bg-opacity-10 rounded-full hover:bg-opacity-100 hover:cursor-pointer'>
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
