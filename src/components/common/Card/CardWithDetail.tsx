import { DetailSourceMovies } from "@/hooks/useMovies";
import { PlaylistAddCheck } from "@mui/icons-material";

interface CardWithDetailProp {
  size: string;
  data: DetailSourceMovies | null;
  transparent?: boolean;
}

const CardWithDetail: React.FC<CardWithDetailProp> = ({ data, size, transparent }) => {
  return (
    <div
      className={`flex flex-row-reverse  ${
        transparent ? "bg-transparent border-none" : "bg-input-only"
      } m-5 rounded-lg border border-secondary hover:border-accent border-opacity-20 transition duration-200  hover:border-opacity-60 hover:cursor-pointer`}>
      <div className='w-full flex flex-col gap-5 px-10 py-5'>
        <div className='flex items-end gap-5'>
          <h4 className='text-xl font-semibold'>
            {!transparent ? <PlaylistAddCheck htmlColor='#F9B546' /> : null} {data?.title}
          </h4>
          <span className='text-sm '>Release Date: {data?.release_date}</span>
        </div>
        <span className='mb-2 text-accent'>{data?.tagline ? `"${data?.tagline}"` : null}</span>
        <p className='max-w-[90%] text-sm'>{data?.overview}</p>
        {data?.production_companies ? (
          <ul className='grid grid-cols-6 gap-4 mt-2'>
            {data?.production_companies?.map((company, index) => {
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
        ) : null}
      </div>
      <img
        className={`${size} rounded-l-lg`}
        src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
        alt='poster-review'
      />
    </div>
  );
};

export default CardWithDetail;
