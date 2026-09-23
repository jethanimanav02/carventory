import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icons'
import { DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD, useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const submit = (event) => {
    event.preventDefault()
    if (!login(email, password)) return setError('That admin email or password is not correct.')
    navigate('/admin')
  }
  return <div className="admin-login-page"><div className="admin-login-card"><Link to="/" className="brand"><span className="brand-mark">C</span><span>carventory<span className="brand-dot">.</span></span></Link><p className="eyebrow">STAFF ACCESS</p><h1>Admin<br /><em>sign in.</em></h1><p className="auth-subtitle">Manage your collection, enquiries and the details that keep every car moving.</p><form onSubmit={submit}><label>Email address<input type="email" value={email} onChange={event => { setEmail(event.target.value); setError('') }} placeholder="admin@carventory.local" required /></label><label>Password<input type="password" value={password} onChange={event => { setPassword(event.target.value); setError('') }} placeholder="Enter demo password" required /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary auth-submit" type="submit">Enter dashboard <Icon name="arrow" size={17} /></button></form><div className="demo-credential"><strong>Experiment 2 demo access</strong><span>{DEMO_ADMIN_EMAIL}</span><span>{DEMO_ADMIN_PASSWORD}</span></div><Link to="/" className="back-link">← Back to storefront</Link></div></div>
}
