import { fetchMovieById } from 'components/fetches';
import React, { useState, useEffect, Suspense } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { MovieCard } from 'components/MovieCard/MovieCard';
import { AdditionalInfo } from 'components/MovieCard/MovieCard.styled';
import { BackLink } from 'components/BackLink/BackLink';

export default function MovieDetails() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const ctr = new AbortController();
    async function getMovieById(controller) {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMovieById(movieId, controller);
        setMovie(data);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
          console.log(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    getMovieById(ctr);
    return () => ctr.abort();
  }, [movieId]);

  return (
    <div>
      <BackLink to={location.state?.from ?? '/'} />
      {movie.original_title && (
        <>
          <MovieCard movie={movie} />
          <AdditionalInfo>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to={`/movies/${movieId}/cast`}>Cast</Link>
              </li>
              <li>
                <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
              </li>
            </ul>
          </AdditionalInfo>
        </>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong...</div>}

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
