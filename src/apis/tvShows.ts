import { API_KEY, BASE_URL } from '../utils/sting';

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

export function getTvDetail(tv_id: string) {
  return fetch(
    `${BASE_URL}/tv/${tv_id}?api_key=${API_KEY}&language=ko-KR`,
  ).then((response) => response.json());
}
