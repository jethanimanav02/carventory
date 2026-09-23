import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminNav() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const handleLogout = () => { logout(); navigate('/admin/login') }
  return <div className="admin-nav"><div className="admin-nav-links"><NavLink to="/admin">Dashboard</NavLink><NavLink to="/admin/inventory">Inventory</NavLink><NavLink to="/admin/cars/new">Add car</NavLink><NavLink to="/admin/enquiries">Enquiries <span>06</span></NavLink></div><button onClick={handleLogout}>Sign out</button></div>
}
