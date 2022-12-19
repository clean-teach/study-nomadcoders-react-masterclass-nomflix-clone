const API_KEY = '10923b261ba94d897ac6b81148314a3f';
const BASE_URL = 'https://api.themoviedb.org/3';

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
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

export function getMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json(),
  );
}
