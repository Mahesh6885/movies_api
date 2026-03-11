import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getMovies, createMovie, updateMovie, deleteMovie } from './api';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetailPage from './pages/MovieDetailPage';
import { X, Plus, Save, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    rating: '',
    description: '',
    image_url: ''
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await getMovies();
      setMovies(response.data);
    } catch (error) {
      toast.error('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMovie) {
        await updateMovie(editingMovie.id, formData);
        toast.success('Movie updated');
      } else {
        await createMovie(formData);
        toast.success('Movie added');
      }
      setIsModalOpen(false);
      setEditingMovie(null);
      resetForm();
      fetchMovies();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', genre: '', year: '', rating: '', description: '', image_url: '' });
  };

  const openAddModal = () => {
    setEditingMovie(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      genre: movie.genre,
      year: movie.year,
      rating: movie.rating,
      description: movie.description,
      image_url: movie.image_url || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(id);
        toast.success('Movie deleted');
        fetchMovies();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Toaster position="bottom-right" />
        <Navbar onAddClick={openAddModal} />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                movies={movies} 
                loading={loading} 
                onRefresh={fetchMovies} 
                onDelete={handleDelete}
                onEdit={openEditModal}
              />
            } 
          />
          <Route 
            path="/movie/:id" 
            element={<MovieDetailPage onEdit={openEditModal} />} 
          />
        </Routes>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-overlay"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="modal-content glass-morphism"
              >
                <div className="modal-header">
                  <h3>{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="close-btn">
                    <X size={24} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="modal-form">
                  <div className="form-group">
                    <label>Movie Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g. Inception"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Poster Image URL</label>
                    <div className="input-with-icon">
                      <ImageIcon size={18} className="input-icon" />
                      <input
                        type="url"
                        value={formData.image_url}
                        onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                        placeholder="https://example.com/poster.jpg"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Genre</label>
                      <input
                        type="text"
                        required
                        value={formData.genre}
                        onChange={(e) => setFormData({...formData, genre: e.target.value})}
                        placeholder="Sci-Fi"
                      />
                    </div>
                    <div className="form-group">
                      <label>Year</label>
                      <input
                        type="number"
                        required
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        placeholder="2010"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Rating (0.0 - 10.0)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      required
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: e.target.value})}
                      placeholder="8.8"
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      required
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Brief overview..."
                    />
                  </div>

                  <button type="submit" className="btn-submit">
                    {editingMovie ? <Save size={20} /> : <Plus size={20} />}
                    {editingMovie ? 'Update Movie' : 'Add to Collection'}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
