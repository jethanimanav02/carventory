import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <h3 style={{ fontSize: '15px', marginBottom: '6px' }}>Carventory</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
              Car Inventory Management System.<br />
              Developed as a 3rd-year engineering practical project.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#334155' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Link to="/" style={{ color: '#64748b' }}>Home</Link>
              <Link to="/cars" style={{ color: '#64748b' }}>Inventory</Link>
              <Link to="/compare" style={{ color: '#64748b' }}>Compare</Link>
              <Link to="/favourites" style={{ color: '#64748b' }}>Favourites</Link>
              <Link to="/admin" style={{ color: '#64748b' }}>Admin Portal</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#334155' }}>Dealership</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
              Ganpati Baba Motors<br />
              Kalyan–Ambernath Road<br />
              Ulhasnagar, Maharashtra
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Carventory — Student Web Engineering Project</span>
          <span>React + Express + MongoDB</span>
        </div>
      </div>
    </footer>
  )
}
