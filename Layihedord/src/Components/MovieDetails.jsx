// Components/MovieDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetailsById } from '../Api';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const movieData = await getMovieDetailsById(id);
      setMovie(movieData);
    }
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <p>{movie.Plot}</p>
      <a
        href={`https://www.imdb.com/title/${movie.imdbID}`}
        target="_blank"
        rel="noopener noreferrer"
        className="view-trailer-button"
      >
        View Trailer
      </a>
    </div>
  );
};

export default MovieDetails;
