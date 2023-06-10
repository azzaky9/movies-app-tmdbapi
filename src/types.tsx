export type GenreId = {
  genre_ids: number | string;
};

export interface InfoPropTypes {
  id?: number;
  title: string;
  date: string;
  rating?: string | number;
  genre: (string | number)[];
}

export interface MoviesDataTypes {
  data: StructuredReponseSource[];

  isLoading: boolean;
}

export interface StructuredReponseSource {
  id: number;
  adult: boolean;
  poster_path: string;
  release_date: string;
  title: string;
  backdrop_path?: string;
  vote_average?: number;
  genre_ids: (string | number)[];
}

export interface ListMenuTypes {
  menuList: {
    names: string;
    childList: {
      name: string;
      path: string;
      icons: JSX.Element;
    }[];
  }[];
}
