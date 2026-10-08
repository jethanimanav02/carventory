import { Link } from 'react-router-dom'

export default function Register() {
  const submit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '60px' }}>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto', padding: '28px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '22px', marginBottom: '4px' }}>Register Account</h1>
          <p className="subtext" style={{ margin: 0 }}>
            Create an account to save and compare cars
          </p>
        </div>

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Full Name</label>
            <input
              id="reg-name"
              type="text"
              className="form-input"
              placeholder="e.g. Rahul Sharma"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email Address</label>
            <input
              id="reg-email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type="password"
              className="form-input"
              placeholder="At least 6 characters"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '16px' }}>
            Create Account
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '13px', borderTop: '1px solid #e2e8f0', paddingTop: '14px' }}>
          <span>Already have an account? </span>
          <Link to="/login" style={{ color: '#2563eb', fontWeight: 500 }}>
            Sign in
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
