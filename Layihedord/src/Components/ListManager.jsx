//./Components/ListManager.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createList, removeMovieFromList } from '../store/moviesSlice';
import { Link } from 'react-router-dom';
import './ListManager.css';

const ListManager = () => {
  const [newListName, setNewListName] = useState('');
  const dispatch = useDispatch();
  const addedMovies = useSelector(state => state.movies.addedMovies);
  const lists = useSelector(state => state.movies.lists);

  const handleCreateList = async () => {
    if (newListName.trim() !== '') {
      await dispatch(createList({ title: newListName, movies: addedMovies }));
      setNewListName('');
      // Очищаем состояние addedMovies
      addedMovies.forEach(movie => {
        dispatch(removeMovieFromList(movie.imdbID));
      });
    }
  };

  const handleRemoveMovie = (movieId) => {
    dispatch(removeMovieFromList(movieId));
  };

  return (
    <div className="list-manager">
      <h3>List Creation</h3>
      <input
        type="text"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
        placeholder="Enter list name"
      />
      <ul>
        {addedMovies.map((movie, index) => (
          <li key={index}>
            {movie.Title}
            <button onClick={() => handleRemoveMovie(movie.imdbID)}>Удалить</button>
          </li>
        ))}
      </ul>
      <button type="submit" onClick={handleCreateList}>Create List</button>
      {lists.length > 0 && (
        <div className="list-links">
          {lists.map((list) => (
            <div key={list.id}>
              <Link className="view-list-link" to={`/list/${list.id}`}>
                {list.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListManager;
