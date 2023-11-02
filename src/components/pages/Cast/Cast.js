import { fetchCastById } from 'components/fetches';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Cast() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const ctr = new AbortController();
    async function getCastById(controller) {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchCastById(movieId, controller);
        setCast(data.cast);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
          console.log(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    getCastById(ctr);
    return () => ctr.abort();
  }, [movieId]);

  return (
    <div>
      <ul>
        {cast.length > 0 &&
          cast.map(({ profile_path, id, name, character }) => (
            <li key={id}>
              {profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                  alt={name}
                />
              )}
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
      </ul>

      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong...</div>}
    </div>
  );
}
