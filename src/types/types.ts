export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
  media_type: Category;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: Number;
  results: IMovie[];
  total_pages: Number;
  total_results: Number;
}

export enum Category {
  movie = 'movie',
  search = 'search',
  tv = 'tv',
}
