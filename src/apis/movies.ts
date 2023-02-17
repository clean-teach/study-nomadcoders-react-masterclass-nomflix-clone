import { API_KEY, BASE_URL } from '../utils/sting';

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
export function getMovieDetail(movie_id: string) {
  return fetch(
    `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=ko-KR`,
  ).then((response) => response.json());
}
