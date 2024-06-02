//./Components/ListDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getListById, getMovieDetailsById } from '../Api';
import './ListDetail.css';

const ListDetail = () => {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchList() {
      const listData = await getListById(id);
      setList(listData);
      const movieDetails = await Promise.all(listData.movies.map(movieId => getMovieDetailsById(movieId)));
      setMovies(movieDetails);
    }
    fetchList();
  }, [id]);

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <div className="list-detail">
      <h2>{list.title}</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">
              {movie.Title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListDetail;
