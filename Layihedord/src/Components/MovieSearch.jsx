// Components/MovieSearch.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchDefaultMovies, addMovieToList } from '../store/moviesSlice';
import { Link } from 'react-router-dom';
import './App.css';
import ListManager from './ListManager';

const defaultMovies = [
  "The Shawshank Redemption",
  "The Green Mile",
  "Django Unchained",
  "The Silence of the Lambs",
  "The Matrix",
  "The Matrix Reloaded",
  "The Matrix Revolutions",
  "The Shining",
  "For a Few Dollars More"
];

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const searchResults = useSelector(state => state.movies.searchResults);
  const addedMovies = useSelector(state => state.movies.addedMovies);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      dispatch(fetchMovies(searchTerm));
    }
  };

  const handleAddToList = (movieId) => {
    const movieDetails = searchResults.find(movie => movie.imdbID === movieId);
    if (!addedMovies.some(movie => movie.imdbID === movieId)) {
      dispatch(addMovieToList(movieDetails));
    }
  };

  useEffect(() => {
    dispatch(fetchDefaultMovies(defaultMovies));
  }, [dispatch]);

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>
      <ListManager addedMovies={addedMovies} />
      <ul className="movie-list">
        {searchResults.map((movie) => (
          <li key={movie.imdbID} className="movie-item">
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            <div className="movie-details">
              <h3 className="movie-title">{movie.Title} ({movie.Year})</h3>
              <div className="button-container">
                <button onClick={() => handleAddToList(movie.imdbID)}>Add to List</button>
                <Link to={`/movie/${movie.imdbID}`}>
                  <button>Details</button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
