import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ favouriteCount = 0, compareCount = 0 }) {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="site-navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
          <span>Carventory</span>
          <span className="brand-tag">B.Tech Project</span>
        </Link>

        <nav className={`nav-menu ${open ? 'open' : ''}`}>
          <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/cars" onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Cars
          </NavLink>
          <NavLink to="/compare" onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Compare {compareCount > 0 && <span className="nav-count">{compareCount}</span>}
          </NavLink>
          <NavLink to="/favourites" onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Favourites {favouriteCount > 0 && <span className="nav-count">{favouriteCount}</span>}
          </NavLink>
          <NavLink to="/admin" onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Admin
          </NavLink>

          {isAuthenticated ? (
            <button
              onClick={() => { logout(); setOpen(false) }}
              className="btn btn-outline btn-sm"
            >
              Sign out
            </button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </nav>

        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
