import { fetchReviewsById } from 'components/fetches';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Reviews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const ctr = new AbortController();
    async function getReviewsById(controller) {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchReviewsById(movieId, controller);
        setReviews(data.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
          console.log(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    getReviewsById(ctr);
    return () => ctr.abort();
  }, [movieId]);

  return (
    <div>
      <ul>
        {reviews.length > 0 ? (
          reviews.map(({ author, content, id }) => (
            <li key={id}>
              <h3>Author: {author}.</h3>
              <p>{content}</p>
            </li>
          ))
        ) : !loading ? (
          <li>No reviews yet</li>
        ) : (
          <li>Loading...</li>
        )}
      </ul>
      {error && <p>Something went wrong...</p>}
    </div>
  );
}
