import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button'
import Icon from './Icons'

const navItems = [['Cars', '/cars'], ['Compare', '/compare'], ['Favourites', '/favourites']]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <div className="container nav-inner">
      <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">C</span><span>carventory<span className="brand-dot">.</span></span></Link>
      <nav className={`nav-links ${open ? 'nav-open' : ''}`}>
        {navItems.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
        <span className="nav-divider" />
        <NavLink to="/admin" onClick={() => setOpen(false)} className="admin-link">Admin <span className="arrow-up">↗</span></NavLink>
        <Button to="/login" variant="outline" className="nav-login">Sign in</Button>
      </nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><Icon name={open ? 'close' : 'menu'} /></button>
    </div>
  </header>
}
