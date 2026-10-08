import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminNav() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '14px',
        marginBottom: '24px'
      }}
    >
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/inventory"
          className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
        >
          Inventory Management
        </NavLink>
        <NavLink
          to="/admin/cars/new"
          className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
        >
          + Add Car
        </NavLink>
        <NavLink
          to="/admin/enquiries"
          className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
        >
          Enquiries
        </NavLink>
      </div>
      <button
        onClick={handleLogout}
        className="btn btn-sm btn-outline"
        style={{ color: '#dc2626' }}
      >
        Sign Out
      </button>
    </div>
  )
}
