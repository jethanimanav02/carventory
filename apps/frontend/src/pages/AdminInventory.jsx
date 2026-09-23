import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import AdminNav from '../components/AdminNav'
import Button from '../components/Button'
import CarForm from '../components/CarForm'
import Icon from '../components/Icons'
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

  const selectedCar = useMemo(() => cars.find(car => String(car.id) === String(carId)), [cars, carId])

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

  if (creating || editing) {
    return (
      <div className="admin-page admin-page-inner">
        <div className="container">
          <AdminNav />
          <div className="admin-form-top">
            <div>
              <Link to="/admin/inventory" className="back-link">← Back to Inventory</Link>
              <p className="kicker">{editing ? 'EDIT LISTING' : 'NEW LISTING'}</p>
              <h1>{editing ? <>Update <em>{selectedCar?.brand} {selectedCar?.model || 'car'}.</em></> : <>Add a <em>new car.</em></>}</h1>
            </div>
          </div>
          {actionStatus && <div className="admin-status-banner">{actionStatus}</div>}
          {actionError && <div className="admin-error-banner">{actionError}</div>}
          {editing && !selectedCar ? (
            <div className="admin-empty">This car was not found in inventory.</div>
          ) : (
            <CarForm initialCar={selectedCar} onSave={save} onCancel={() => navigate('/admin/inventory')} />
          )}
        </div>
      </div>
    )
  }

  const filteredCars = cars.filter(car =>
    [car.brand, car.model, car.variant, car.location]
      .join(' ')
      .toLowerCase()
      .includes(query.toLowerCase())
  )

  return (
    <div className="admin-page admin-page-inner">
      <div className="container">
        <AdminNav />
        <div className="admin-top">
          <div>
            <p className="kicker">CARVENTORY / INVENTORY</p>
            <h1>Manage your <em>collection.</em></h1>
          </div>
          <Button to="/admin/cars/new" icon="arrow">Add a car</Button>
        </div>

        {actionStatus && <div className="admin-status-banner">{actionStatus}</div>}
        {actionError && <div className="admin-error-banner">{actionError}</div>}

        <div className="inventory-toolbar">
          <label>
            <Icon name="search" size={17} />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search cars, models or locations"
            />
          </label>
          <span>{cars.length} total cars</span>
        </div>

        {loading ? (
          <div className="admin-empty">Loading cars...</div>
        ) : error ? (
          <div className="admin-error-banner">Unable to load cars. Please try again.</div>
        ) : filteredCars.length === 0 ? (
          <div className="admin-empty">No cars found.</div>
        ) : (
          <div className="admin-inventory-list">
            {filteredCars.map(car => (
              <div className="admin-inventory-row" key={car.id}>
                <img src={car.image} alt={`${car.brand} ${car.model}`} />
                <div>
                  <strong>{car.brand} {car.model}</strong>
                  <span>{car.year} · {car.variant} · {formatPrice(car.price)}</span>
                </div>
                <select
                  className={`admin-status-select ${car.status.toLowerCase()}`}
                  value={car.status}
                  onChange={event => updateCarStatus(car.id, event.target.value)}
                  aria-label={`Status for ${car.brand} ${car.model}`}
                >
                  {['AVAILABLE', 'RESERVED', 'SOLD', 'HIDDEN'].map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <Link to={`/admin/cars/${car.id}/edit`} className="table-action">Edit</Link>
                <button
                  className="table-action delete-action"
                  onClick={() => remove(car.id, `${car.brand} ${car.model}`)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
