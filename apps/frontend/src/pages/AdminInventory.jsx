import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import AdminNav from '../components/AdminNav'
import CarForm from '../components/CarForm'
import { formatPrice } from '../data/cars'
import { useCarsContext } from '../context/CarContext'

export default function AdminInventory() {
  const { cars, loading, error, addCar, updateCar, deleteCar, updateCarStatus } = useCarsContext()
  const location = useLocation()
  const navigate = useNavigate()
  const { carId } = useParams()
  const editing = location.pathname.includes('/edit')
  const creating = location.pathname.endsWith('/new')
  const [query, setQuery] = useState('')
  const [actionStatus, setActionStatus] = useState('')
  const [actionError, setActionError] = useState('')

  const selectedCar = useMemo(
    () => cars.find((car) => String(car.id) === String(carId)),
    [cars, carId]
  )

  const save = async (car) => {
    setActionStatus('Saving...')
    setActionError('')
    try {
      if (editing) {
        await updateCar(carId, car)
      } else {
        await addCar(car)
      }
      setActionStatus('')
      navigate('/admin/inventory')
    } catch (err) {
      setActionStatus('')
      setActionError(err.message || 'Failed to save car. Please try again.')
    }
  }

  const remove = async (id, name) => {
    if (window.confirm(`Delete ${name} from inventory? This cannot be undone.`)) {
      setActionStatus('Deleting...')
      setActionError('')
      try {
        await deleteCar(id)
      } catch (err) {
        setActionError(err.message || 'Failed to delete car. Please try again.')
      } finally {
        setActionStatus('')
      }
    }
  }

  // Handle Add / Edit form screen
  if (creating || editing) {
    return (
      <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        <AdminNav />

        <div style={{ marginBottom: '20px' }}>
          <Link to="/admin/inventory" className="btn btn-sm btn-outline" style={{ marginBottom: '12px' }}>
            ← Back to Inventory Table
          </Link>
          <h1>{editing ? `Edit Car: ${selectedCar?.brand || ''} ${selectedCar?.model || ''}` : 'Add New Car to Inventory'}</h1>
          <p className="subtext" style={{ margin: 0 }}>
            {editing ? 'Update vehicle specifications in the database' : 'Enter car details to list in dealership inventory'}
          </p>
        </div>

        {actionStatus && (
          <div className="status-banner status-banner-info">{actionStatus}</div>
        )}
        {actionError && (
          <div className="status-banner status-banner-error">{actionError}</div>
        )}

        {editing && !selectedCar ? (
          <div className="card" style={{ padding: '30px', textAlign: 'center' }}>
            <p>Car not found in inventory.</p>
            <Link to="/admin/inventory" className="btn btn-primary btn-sm">
              Back to Inventory
            </Link>
          </div>
        ) : (
          <CarForm
            initialCar={selectedCar}
            onSave={save}
            onCancel={() => navigate('/admin/inventory')}
          />
        )}
      </div>
    )
  }

  const filteredCars = cars.filter((car) =>
    [car.brand, car.model, car.variant, car.location]
      .join(' ')
      .toLowerCase()
      .includes(query.toLowerCase())
  )

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <AdminNav />

      {/* Header & Add Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div>
          <h1>Car Inventory Management</h1>
          <p className="subtext" style={{ margin: 0 }}>
            Perform CRUD operations on dealership database ({cars.length} cars total)
          </p>
        </div>
        <Link to="/admin/cars/new" className="btn btn-primary">
          + Add New Car
        </Link>
      </div>

      {actionStatus && (
        <div className="status-banner status-banner-info">{actionStatus}</div>
      )}
      {actionError && (
        <div className="status-banner status-banner-error">{actionError}</div>
      )}

      {/* Search Toolbar */}
      <div
        className="card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 16px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '400px' }}>
          <input
            type="text"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by brand, model, or location..."
            style={{ width: '100%' }}
          />
        </div>
        <span style={{ fontSize: '13px', color: '#64748b' }}>
          Showing {filteredCars.length} of {cars.length} vehicles
        </span>
      </div>

      {/* CRUD Table */}
      {loading ? (
        <div className="card" style={{ padding: '30px', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#64748b' }}>Loading inventory...</p>
        </div>
      ) : error ? (
        <div className="status-banner status-banner-error">
          Unable to load inventory. Please ensure the backend is running.
        </div>
      ) : filteredCars.length === 0 ? (
        <div className="card" style={{ padding: '30px', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#64748b' }}>No cars found matching your search.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Image</th>
                <th>Car Details</th>
                <th>Price</th>
                <th>Specs</th>
                <th style={{ width: '130px' }}>Status</th>
                <th style={{ width: '140px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => (
                <tr key={car.id}>
                  <td>
                    <img
                      src={car.image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=100&q=80'}
                      alt=""
                      style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '3px' }}
                    />
                  </td>
                  <td>
                    <strong>{car.brand} {car.model}</strong>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      {car.year} · {car.variant}
                    </div>
                  </td>
                  <td>
                    <strong style={{ color: '#2563eb' }}>{formatPrice(car.price)}</strong>
                  </td>
                  <td style={{ fontSize: '12px', color: '#475569' }}>
                    {car.fuel} · {car.transmission}
                    <div style={{ color: '#64748b' }}>{car.location}</div>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      style={{ padding: '4px 6px', fontSize: '12px', width: 'auto' }}
                      value={car.status}
                      onChange={(e) => updateCarStatus(car.id, e.target.value)}
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="RESERVED">RESERVED</option>
                      <option value="SOLD">SOLD</option>
                      <option value="HIDDEN">HIDDEN</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <Link
                        to={`/admin/cars/${car.id}/edit`}
                        className="btn btn-sm btn-outline"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline"
                        style={{ color: '#dc2626' }}
                        onClick={() => remove(car.id, `${car.brand} ${car.model}`)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
