import { memo, useEffect, useState } from "react";
import { useAuthenticateRequest } from "@/hooks/useAuthenticate";
import { useService } from "@/hooks/useService";
import { AxiosError } from "axios";
import CardWithDetail from "./common/Card/CardWithDetail";
import { DetailSourceMovies } from "@/hooks/useMovies";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Chip } from "@mui/material";
import { Theaters } from "@mui/icons-material";

const WatchListComponents = memo(() => {
  const { getCurrentUser } = useAuthenticateRequest();
  const { isLoading, fetchSourceUserHave } = useService();
  const [userWl, setUserWl] = useState<DetailSourceMovies[]>([]);

  const user = getCurrentUser();

  const getUserWl = async () => {
    try {
      const data = await fetchSourceUserHave();

      if (data) setUserWl(data);
    } catch (e) {
      if (e instanceof AxiosError) console.log(e);
    }
  };

  useEffect(() => {
    getUserWl();
  }, []);

  if (isLoading) {
    return <p>Wait . . .</p>;
  }

  return (
    <div className='p-5'>
      <h5 className='text-base p-5'>Hello {user?.name} Here's your Watchlist</h5>
      <Chip
        sx={{ mx: 2, my: 1, py: 1, color: "#fafafa" }}
        variant='outlined'
        color='default'
        icon={<Theaters />}
        label='Movies'
        size='small'
      />
      <div className='flex flex-col'>
        <LazyLoadComponent>
          {userWl.map((item, index) => (
            <CardWithDetail
              key={index}
              data={item}
              size='max-h-[260px]'
            />
          ))}
        </LazyLoadComponent>
      </div>
    </div>
  );
});

export default WatchListComponents;
