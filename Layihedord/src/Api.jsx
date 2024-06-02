// Api.jsx
const API_KEY = "84756ab6";

// Функция для поиска фильма по названию
export const searchMoviesByTitle = async (title) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error('Ошибка при поиске фильма:', error);
    return [];
  }
};

// Функция для получения детальной информации о фильме по его ID
export const getMovieDetailsById = async (id) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении информации о фильме:', error);
    return null;
  }
};

// Функция для добавления фильма в список
export const addToMovieList = async (listTitle, movieIds) => {
  try {
    const response = await fetch('https://acb-api.algoritmika.org/api/movies/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: listTitle,
        movies: movieIds
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при добавлении фильма в список:', error);
    return null;
  }
};

// Функция для получения списка по идентификатору
export const getListById = async (id) => {
  try {
    const response = await fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении списка:', error);
    return null;
  }
};

// Функция для получения всех списков
export const getAllLists = async () => {
  try {
    const response = await fetch('https://acb-api.algoritmika.org/api/movies/list');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении всех списков:', error);
    return [];
  }
};
