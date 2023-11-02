import axios from 'axios';

const API_KEY = '21cb5b2c9822fef4849f89544064d2b9';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchPopulars = async controller => {
  const resp = await axios.get(`/trending/movie/day?api_key=${API_KEY}`, {
    signal: controller.signal,
  });
  return resp.data;
};

export const fetchSearch = async (query, controller) => {
  const resp = await axios.get(
    `/search/movie?api_key=${API_KEY}&query=${query}`,
    {
      signal: controller.signal,
    }
  );
  return resp.data;
};

export const fetchMovieById = async (mId, controller) => {
  const resp = await axios.get(`/movie/${mId}?api_key=${API_KEY}`, {
    signal: controller.signal,
  });
  return resp.data;
};

export const fetchCastById = async (mId, controller) => {
  const resp = await axios.get(`/movie/${mId}/credits?api_key=${API_KEY}`, {
    signal: controller.signal,
  });
  return resp.data;
};

export const fetchReviewsById = async (mId, controller) => {
  const resp = await axios.get(`/movie/${mId}/reviews?api_key=${API_KEY}`, {
    signal: controller.signal,
  });
  return resp.data;
};
