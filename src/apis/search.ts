import { API_KEY, BASE_URL } from '../utils/sting';

export function getSearchMulty(query: string | null) {
  return fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`,
  ).then((response) => response.json());
}
