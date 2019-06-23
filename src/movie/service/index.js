import axios from 'axios';
import qs from 'query-string';

const MOVIE_API_URL = 'http://www.omdbapi.com';

async function get(params) {
  const queryParams = qs.stringify({
    apikey: process.env.REACT_APP_MOVIE_API_KEY,
    ...params
  });

  return await axios.get(
    `${MOVIE_API_URL}${queryParams ? `/?${queryParams}` : ''}`
  );
}

export default { get };
