import { BackLink } from 'components/BackLink/BackLink';
import { fetchSearch } from 'components/fetches';
import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Movies() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const controller = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    if (controller.current) {
      controller.current.abort();
    }
    controller.current = new AbortController();
    try {
      setError(false);
      setLoading(true);
      const data = await fetchSearch(e.target[0].value, controller.current);
      setMovies(data.results);
    } catch (error) {
      if (error.code !== 'ERR_CANCELED') {
        setError(true);
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <BackLink to={location.state?.from ?? '/'} />
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies?.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong...</div>}
    </div>
  );
}
