import React from 'react';
import { Card } from './MovieCard.styled';

export function MovieCard({ movie }) {
  const ganres = movie.genres?.map(ganre => ganre.name).join(' ');
  return (
    <Card>
      <img
        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
        alt={movie.original_title}
      />
      <div>
        <h2>{movie.original_title}</h2>
        <p>User score: {movie.vote_average}</p>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <p>{ganres}</p>
      </div>
    </Card>
  );
}
