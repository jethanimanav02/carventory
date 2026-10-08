import { Link } from 'react-router-dom'

export default function Login() {
  const submit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '60px' }}>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto', padding: '28px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '22px', marginBottom: '4px' }}>Customer Login</h1>
          <p className="subtext" style={{ margin: 0 }}>
            Sign in to access your saved favourites and shortlist
          </p>
        </div>

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" /> Remember me
            </label>
            <span style={{ color: '#64748b' }}>Forgot password?</span>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '16px' }}>
            Sign In
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '13px', borderTop: '1px solid #e2e8f0', paddingTop: '14px' }}>
          <span>Don't have an account? </span>
          <Link to="/register" style={{ color: '#2563eb', fontWeight: 500 }}>
            Register here
          </Link>
          <div style={{ marginTop: '8px' }}>
            <Link to="/" style={{ color: '#64748b' }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
