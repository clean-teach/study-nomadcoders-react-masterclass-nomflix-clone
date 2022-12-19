const API_KEY = '10923b261ba94d897ac6b81148314a3f';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface IMovie {
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

export function getlastedMovies() {
  return fetch(`${BASE_URL}/movie/latest?api_key=${API_KEY}`).then((response) =>
    response.json(),
  );
}
export function getNowPlayingMovies() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`,
  ).then((response) => response.json());
}
export function getTopRatedMovies() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`,
  ).then((response) => response.json());
}
export function getUpcomingMovies() {
  return fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR`,
  ).then((response) => response.json());
}

export function getlastedTv() {
  return fetch(`${BASE_URL}/tv/latest?api_key=${API_KEY}`).then((response) =>
    response.json(),
  );
}
export function getAiringTodayTv() {
  return fetch(
    `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko-KR`,
  ).then((response) => response.json());
}
export function getPopularTv() {
  return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko-KR`).then(
    (response) => response.json(),
  );
}
export function getTopRatedTv() {
  return fetch(
    `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko-KR`,
  ).then((response) => response.json());
}
export function getSearchMulty(query: string | null) {
  return fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`,
  ).then((response) => response.json());
}
