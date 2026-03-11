import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovie, deleteMovie } from '../api';
import { Star, Calendar, ArrowLeft, Edit3, Trash2, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function MovieDetailPage({ onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const response = await getMovie(id);
      setMovie(response.data);
    } catch (error) {
      toast.error('Failed to load movie details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(id);
        toast.success('Movie deleted');
        navigate('/');
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const getPoster = (url) => url || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000';

  if (loading) return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="skeleton-card glass-morphism animate-pulse" style={{ width: '100%', maxWidth: '800px', height: '600px' }} />
    </div>
  );

  if (!movie) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="content-area"
      style={{ marginTop: '40px' }}
    >
      <button onClick={() => navigate('/')} className="btn-icon glass-morphism" style={{ marginBottom: '24px', width: 'auto', padding: '0 16px' }}>
        <ArrowLeft size={20} /> <span style={{ marginLeft: '8px' }}>Back to Collection</span>
      </button>

      <div className="glass-morphism detail-page-card overflow-hidden">
        <div className="detail-banner" style={{ height: '450px' }}>
          <img 
            src={getPoster(movie.image_url)} 
            alt={movie.title} 
            className="detail-image" 
            style={{ opacity: 1 }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000';
            }}
          />
          <div className="detail-rating">
            <Star size={24} className="star-icon" />
            <span>{movie.rating} / 10</span>
          </div>
        </div>
        
        <div className="detail-body" style={{ padding: '60px' }}>
          <div className="detail-meta">
            <span className="badge-genre-large">{movie.genre}</span>
            <span className="detail-year">
              <Calendar size={20} /> {movie.year}
            </span>
          </div>
          
          <h2 className="detail-title" style={{ fontSize: '4rem' }}>{movie.title}</h2>
          <div className="detail-divider" />
          
          <div className="detail-section">
            <h4>SYNOPSIS</h4>
            <p className="detail-description" style={{ fontSize: '1.25rem' }}>{movie.description}</p>
          </div>

          <div className="detail-footer" style={{ marginTop: '40px' }}>
            <button 
              onClick={() => onEdit(movie)}
              className="btn-outline"
              style={{ padding: '16px 32px', fontSize: '1.1rem' }}
            >
              <Edit3 size={20} /> Edit Movie
            </button>
            <button 
              onClick={handleDelete}
              className="btn-danger"
              style={{ width: '60px', height: '60px' }}
            >
              <Trash2 size={24} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MovieDetailPage;
