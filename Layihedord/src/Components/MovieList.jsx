//./Components/MovieList.jsx
import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <div>
      <h2>Список фильмов</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <div>
              <h3>{movie.Title}</h3>
              <p>Год: {movie.Year}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
