//./Components/AllLists.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLists } from '../store/moviesSlice';
import './AllLists.css';

const AllLists = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.movies.lists);

  useEffect(() => {
    dispatch(fetchAllLists());
  }, [dispatch]);

  return (
    <div className="all-lists">
      <h2>All Lists</h2>
      {lists.length > 0 ? (
        lists.map(list => (
          <div key={list.id} className="list-item">
            <h3>{list.title}</h3>
            <ul>
              {list.movies.map(movie => (
                <li key={movie}>
                  <a href={`https://www.imdb.com/title/${movie}`} target="_blank" rel="noopener noreferrer">
                    {movie}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No lists found.</p>
      )}
    </div>
  );
};

export default AllLists;
