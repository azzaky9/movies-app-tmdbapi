import { BookmarkAddOutlined, PlayCircleFilledWhite, PlaylistAdd } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";
import { InfoPropTypes } from "@/types";
import { Title } from "@/components/common/utils";
import { useGenre } from "@/hooks/useGenre";
import { useNavigate } from "react-router-dom";
import { useService } from "@/hooks/useService";

const MoviesInfo: React.FC<InfoPropTypes> = ({ title, date, genre, id }) => {
  const { genreNames } = useGenre(genre);
  const { postWatchList } = useService();
  const navigate = useNavigate();
  const path = "/movies/" + id;

  const handleClick = () => navigate(path);

  const genreText =
    genreNames?.length > 1 ? `${genreNames.at(0)} / ${genreNames.at(1)}` : `${genreNames.at(0)}`;

  return (
    <div className='absolute bottom-0 w-full p-3'>
      <span className='text-accent'>{genreText}</span>
      <Title
        title={title}
        date={date}
        size='medium'
      />

      <div className='flex justify-between'>
        <div className='flex '>
          <IconButton
            color='neutral'
            onClick={() => postWatchList(Number(id))}
            aria-label='add-to-watchlist'
            size='large'>
            <PlaylistAdd
              fontSize='inherit'
              htmlColor='#F9B546'
            />
          </IconButton>
          <IconButton
            color='neutral'
            onClick={handleClick}
            aria-label='look detail movie'
            size='medium'>
            <PlayCircleFilledWhite
              fontSize='large'
              htmlColor='#F9B546'
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export const BookmarkButton = () => {
  return (
    <button className='bg-black p-2 bg-opacity-40 rounded-lg hover:cursor-pointer'>
      <Tooltip title='Add To Playlist'>
        <BookmarkAddOutlined className='text-accent' />
      </Tooltip>
    </button>
  );
};

export default MoviesInfo;
