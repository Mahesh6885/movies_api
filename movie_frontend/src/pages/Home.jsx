import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, Edit3, Trash2, Film, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Home({ movies, loading, onRefresh, onDelete, onEdit }) {
  const navigate = useNavigate();

  const getPoster = (url) => url || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000';

  return (
    <main className="content-area">
      <header className="content-header">
        <div className="header-text">
          <h2 className="title-gradient">Your Collection</h2>
          <p className="subtitle">Manage and explore your personal library of films.</p>
        </div>
        <button onClick={onRefresh} className="btn-icon glass-morphism" title="Refresh">
          <RefreshCw size={20} className={loading ? 'spinning' : ''} />
        </button>
      </header>

      {loading ? (
        <div className="movie-grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton-card glass-morphism animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="movie-grid">
          <AnimatePresence>
            {movies.map((movie) => (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="movie-card glass-morphism"
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-banner">
                  <img 
                    src={getPoster(movie.image_url)} 
                    alt={movie.title} 
                    className="card-image" 
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000';
                    }}
                  />
                  <div className="rating-badge">
                    <Star size={14} className="star-icon" />
                    <span>{movie.rating}</span>
                  </div>
                  <div className="banner-overlay" />
                </div>
                
                <div className="card-body">
                  <div className="card-meta">
                    <span className="badge-genre">{movie.genre}</span>
                    <span className="year-label">
                      <Calendar size={12} /> {movie.year}
                    </span>
                  </div>
                  <h3 className="card-title">{movie.title}</h3>
                  <p className="card-desc">{movie.description}</p>
                  
                  <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onEdit(movie)} className="btn-outline" title="Edit">
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => onDelete(movie.id)} className="btn-danger" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && movies.length === 0 && (
        <div className="empty-state">
          <Film size={48} className="empty-icon" />
          <h3>No movies found</h3>
          <p>Start adding some to your stack!</p>
        </div>
      )}
    </main>
  );
}

export default Home;
