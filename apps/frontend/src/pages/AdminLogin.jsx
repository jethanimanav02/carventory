import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD, useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const submit = (event) => {
    event.preventDefault()
    if (!login(email, password)) {
      return setError('Invalid admin email or password.')
    }
    navigate('/admin')
  }

  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '60px' }}>
      <div className="card" style={{ maxWidth: '420px', margin: '0 auto', padding: '28px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span className="badge badge-reserved" style={{ marginBottom: '8px' }}>
            Staff Portal
          </span>
          <h1 style={{ fontSize: '22px', marginBottom: '4px' }}>Admin Login</h1>
          <p className="subtext" style={{ margin: 0 }}>
            Sign in to manage inventory, cars, and enquiries
          </p>
        </div>

        {error && (
          <div className="status-banner status-banner-error" style={{ marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Admin Email</label>
            <input
              id="admin-email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="admin@carventory.local"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '16px' }}>
            Enter Admin Dashboard
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div
          style={{
            backgroundColor: '#f1f5f9',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            padding: '12px',
            fontSize: '12px',
            color: '#334155',
            marginBottom: '16px'
          }}
        >
          <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>
            Demo Credentials (Experiment 2 & 3):
          </div>
          <div>Email: <code>{DEMO_ADMIN_EMAIL}</code></div>
          <div>Password: <code>{DEMO_ADMIN_PASSWORD}</code></div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '13px' }}>
          <Link to="/" style={{ color: '#64748b' }}>
            ← Back to Storefront
          </Link>
        </div>
      </div>
    </div>
  )
}
