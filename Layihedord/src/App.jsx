// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieSearch from './Components/MovieSearch';
import MovieDetails from './Components/MovieDetails';
import ListDetail from './Components/ListDetail';
import Header from './Components/Header';
import './Components/App.css';

const App = () => {
  return (
    <Router>
      <div id="root">
        <Header />
        <Routes>
          <Route path="/" element={<MovieSearch />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/list/:id" element={<ListDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
