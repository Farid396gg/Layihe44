//./store/movieSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchMoviesByTitle, getMovieDetailsById, addToMovieList, getListById, getAllLists } from '../Api';

const initialState = {
  searchResults: [],
  addedMovies: [],
  lists: [],
  listDetails: null,
  status: 'idle',
  error: null,
};

const filterMovies = (movies, titles) => {
  return movies.filter(movie => titles.includes(movie.Title));
};

const removeDuplicates = (movies) => {
  const uniqueMovies = new Map();
  movies.forEach(movie => {
    if (!uniqueMovies.has(movie.imdbID)) {
      uniqueMovies.set(movie.imdbID, movie);
    }
  });
  return Array.from(uniqueMovies.values());
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (title) => {
  const response = await searchMoviesByTitle(title);
  return removeDuplicates(response.filter(movie => movie.Type === "movie"));
});

export const fetchDefaultMovies = createAsyncThunk('movies/fetchDefaultMovies', async (defaultMovies) => {
  const defaultMovieResults = await Promise.all(defaultMovies.map(title => searchMoviesByTitle(title)));
  return removeDuplicates(defaultMovieResults.flat().filter(movie => movie.Type === "movie"));
});

export const fetchMovieDetails = createAsyncThunk('movies/fetchMovieDetails', async (id) => {
  const response = await getMovieDetailsById(id);
  return response;
});

export const createList = createAsyncThunk('movies/createList', async ({ title, movies }) => {
  const response = await addToMovieList(title, movies.map(movie => movie.imdbID));
  return response;
});

export const fetchListDetails = createAsyncThunk('movies/fetchListDetails', async (id) => {
  const response = await getListById(id);
  const movieDetails = await Promise.all(response.movies.map(movieId => getMovieDetailsById(movieId)));
  return { ...response, movies: movieDetails };
});

export const fetchAllLists = createAsyncThunk('movies/fetchAllLists', async () => {
  const response = await getAllLists();
  return response;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovieToList: (state, action) => {
      const movie = action.payload;
      if (!state.addedMovies.some(m => m.imdbID === movie.imdbID)) {
        state.addedMovies.push(movie);
      }
    },
    removeMovieFromList: (state, action) => {
      const movieId = action.payload;
      state.addedMovies = state.addedMovies.filter(movie => movie.imdbID !== movieId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchDefaultMovies.fulfilled, (state, action) => {
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
        state.searchResults = filterMovies(removeDuplicates(action.payload), defaultMovies);
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.addedMovies.push(action.payload);
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
        state.addedMovies = []; // Очищаем addedMovies после создания списка
      })
      .addCase(fetchListDetails.fulfilled, (state, action) => {
        state.listDetails = action.payload;
      })
      .addCase(fetchAllLists.fulfilled, (state, action) => {
        state.lists = action.payload;
      });
  },
});

export const { addMovieToList, removeMovieFromList } = moviesSlice.actions;

export default moviesSlice.reducer;
