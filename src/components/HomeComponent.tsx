import { memo } from "react";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { WhatshotOutlined } from "@mui/icons-material";
import Movies from "./common/Movies/Movies";

const HomeComponent = memo(function HomeComponent() {
  const { data, isLoading } = useFetch([
    "https://api.themoviedb.org/3/movie/popular?api_key=6ec04232daa57ba5165114bab7c10f0c&language=en-US&page=1",
    "https://api.themoviedb.org/3/trending/all/day?api_key=6ec04232daa57ba5165114bab7c10f0c",
  ]);

  return (
    <div>
      <div className='flex justify-between py-8 '>
        <h2 className='text-2xl font-semibold px-1'>Top 10 </h2>
        <Link
          className='text-accent'
          to='/top 10 movies'>
          See All
        </Link>
      </div>
      <Movies
        data={data[0]?.results?.slice(0, 10)}
        isLoading={isLoading}
      />
      <div className='flex justify-between py-8 '>
        <h2 className='text-2xl font-semibold px-1'>
          Popular Of The Week <WhatshotOutlined className='text-accent' />
        </h2>
        <Link
          className='text-accent'
          to='/top 10 movies'>
          See All
        </Link>
      </div>
      <Movies
        data={data[1]?.results?.slice(0, 10)}
        isLoading={isLoading}
      />
    </div>
  );
});

export default HomeComponent;
