import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Plus } from 'lucide-react';

function Navbar({ onAddClick }) {
  return (
    <nav className="navbar glass-morphism">
      <Link to="/" className="nav-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="brand-icon">
          <Film size={24} />
        </div>
        <h1 className="brand-name">CINE<span className="text-primary">STACK</span></h1>
      </Link>
      <button onClick={onAddClick} className="btn-primary">
        <Plus size={20} /> Add Movie
      </button>
    </nav>
  );
}

export default Navbar;
