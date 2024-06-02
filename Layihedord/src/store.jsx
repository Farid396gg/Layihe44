import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './store/moviesSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export default store;
