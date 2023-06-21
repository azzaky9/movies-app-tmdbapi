export type GenreTypes = (number | string)[];

export interface InfoPropTypes {
  id: number | string;
  title: string;
  date: string;
  rating?: number | string;
  genre: GenreTypes;
}

export interface MoviesDataTypes {
  data: StructuredReponseSource[];
  isLoading?: boolean;
}

export interface StructuredReponseSource {
  id: string;
  adult: boolean;
  poster_path: string;
  release_date: string;
  title: string;
  backdrop_path?: string;
  vote_average?: number;
  genre_ids: GenreTypes;
}
