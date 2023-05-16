import { PlayArrow, BookmarkAddOutlined, KeyboardArrowDown } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const Posters = ({ id, title, date }: { title: string; date: string; id: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className='absolute bottom-0 w-full p-3'>
      <h3 className='text-[15.2px] text-start mb-4 flex flex-col gap-1'>
        {title}
        <span>
          {/* Get only year from date Props  */}({date?.substring(0, 4)})
        </span>
      </h3>

      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <button className='smooth-transition bg-accent w-10 h-10 bg-opacity-10 rounded-full hover:bg-opacity-100 hover:cursor-pointer'>
            <Tooltip title='Detail Movies'>
              <PlayArrow className='smooth-transition text-accent hover:text-primary' />
            </Tooltip>
          </button>
          <button className='bg-accent p-2 bg-opacity-10 rounded-lg hover:cursor-pointer'>
            <Tooltip title='Add To Playlist'>
              <BookmarkAddOutlined className='text-accent' />
            </Tooltip>
          </button>
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

export default Posters;
