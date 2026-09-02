import { Link } from 'react-router-dom'

export default function Footer() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div><Link to="/" className="brand footer-brand"><span className="brand-mark">C</span><span>carventory<span className="brand-dot">.</span></span></Link><p className="footer-copy">A considered collection of cars<br />for the road ahead.</p></div>
    <div><p className="footer-label">Explore</p><Link to="/cars">Browse cars</Link><Link to="/compare">Compare</Link><Link to="/favourites">Favourites</Link></div>
    <div><p className="footer-label">Visit us</p><p>12 Jubilee Hills Road<br />Hyderabad, TS 500033</p><p>Mon–Sun · 9am–8pm</p></div>
    <div><p className="footer-label">Have a question?</p><a href="mailto:hello@carventory.in">hello@carventory.in</a><a href="tel:+914040401234">+91 40 4040 1234</a></div>
  </div><div className="container footer-bottom"><span>© 2026 Carventory</span><span>Made for better car days.</span></div></footer>
}
