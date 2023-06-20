import "./InfiniteScroll.css";
import { memo, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { StructuredReponseSource } from "@/types";

const InfiniteScrol = memo(({ reverse }: { reverse?: boolean }) => {
  const key = import.meta.env.VITE_API_KEY;
  const [marqueeMovie, setMarqueMovie] = useState<StructuredReponseSource[]>([]);

  const endpoints = [
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=3`,
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  ];

  const fetchAll = async () => {
    const mappingEndpoint = endpoints.map((endpoint) => axios.get(endpoint));

    const source: AxiosResponse<{ results: StructuredReponseSource[] }>[] = await Promise.all(
      mappingEndpoint
    );

    setMarqueMovie(source[0].data.results);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  console.log(marqueeMovie);

  return (
    <article className='wrapper'>
      <div className={`marquee ${reverse ? "marquee--reverse" : null}`}>
        <div className='marquee__group'>
          {marqueeMovie?.slice(0, 10).map((item) => (
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt=''
              className='rounded-xl'
            />
          ))}
        </div>

        <div
          aria-hidden='true'
          className='marquee__group'>
          {marqueeMovie?.slice(10, 20).map((item) => (
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt=''
              className='rounded-3xl'
            />
          ))}
        </div>
      </div>
    </article>
  );
});

export default InfiniteScrol;
