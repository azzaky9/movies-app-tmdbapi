export interface InfoPropTypes {
  id?: number;
  title: string;
  date: string;
  rating?: string | number;
  genre: (string | number)[];
}

export interface MoviesDataTypes {
  data: {
    id: number;
    adult: boolean;
    poster_path: string;
    release_date: string;
    title: string;
    backdrop_path?: string;
    vote_average?: number;
    genre_ids: (number | string)[];
  }[];

  isLoading: boolean;
}
