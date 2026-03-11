import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getMovies = () => api.get('/movies/');
export const getMovie = (id) => api.get(`/movies/${id}/`);
export const createMovie = (movie) => api.post('/movies/', movie);
export const updateMovie = (id, movie) => api.put(`/movies/${id}/`, movie);
export const deleteMovie = (id) => api.delete(`/movies/${id}/`);

export default api;
