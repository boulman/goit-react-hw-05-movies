import { fetchPopulars } from 'components/fetches';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BackLink } from 'components/BackLink/BackLink';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [popular, setPopular] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const ctr = new AbortController();
    async function getPopular(controller) {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchPopulars(controller);
        setPopular(data.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
          console.log(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    getPopular(ctr);

    return () => ctr.abort();
  }, []);

  return (
    <div>
      <BackLink to={location.state?.from ?? '/'} />
      <h2>Trending today</h2>
      <ul>
        {popular?.map(movie => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong...</div>}
    </div>
  );
}
