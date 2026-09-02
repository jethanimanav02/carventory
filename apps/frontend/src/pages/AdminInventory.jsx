import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import AdminNav from '../components/AdminNav'
import Button from '../components/Button'
import CarForm from '../components/CarForm'
import Icon from '../components/Icons'
import useCars from '../hooks/useCars'

export default function AdminInventory() {
  const { cars, addCar, updateCar, deleteCar } = useCars()
  const location = useLocation()
  const navigate = useNavigate()
  const { carId } = useParams()
  const editing = location.pathname.includes('/edit')
  const creating = location.pathname.endsWith('/new')
  const [query, setQuery] = useState('')
  const selectedCar = useMemo(() => cars.find(car => car.id === carId), [cars, carId])
  const save = (car) => { if (editing) updateCar(carId, car); else addCar(car); navigate('/admin/inventory') }
  const remove = (id, name) => { if (window.confirm(`Delete ${name} from the mock inventory? This cannot be undone.`)) deleteCar(id) }
  if (creating || editing) return <div className="admin-page admin-page-inner"><div className="container"><AdminNav /><div className="admin-form-top"><div><Link to="/admin/inventory" className="back-link">← Inventory</Link><p className="kicker">{editing ? 'EDIT LISTING' : 'NEW LISTING'}</p><h1>{editing ? <>Update <em>{selectedCar?.model || 'car'}.</em></> : <>Add a <em>new car.</em></>}</h1></div></div>{editing && !selectedCar ? <div className="admin-empty">This car is no longer in the mock inventory.</div> : <CarForm initialCar={selectedCar} onSave={save} onCancel={() => navigate('/admin/inventory')} />}</div></div>
  return <div className="admin-page admin-page-inner"><div className="container"><AdminNav /><div className="admin-top"><div><p className="kicker">CARVENTORY / INVENTORY</p><h1>Manage your <em>collection.</em></h1></div><Button to="/admin/cars/new" icon="arrow">Add a car</Button></div><div className="inventory-toolbar"><label><Icon name="search" size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search cars, models or locations" /></label><span>{cars.length} total cars</span></div><div className="admin-inventory-list">{cars.filter(car => [car.brand, car.model, car.variant, car.location].join(' ').toLowerCase().includes(query.toLowerCase())).map(car => <div className="admin-inventory-row" key={car.id}><img src={car.image} alt="" /><div><strong>{car.brand} {car.model}</strong><span>{car.year} · {car.variant} · {car.location}</span></div><span className={`status-tag ${car.status.toLowerCase()}`}>{car.status}</span><Link to={`/admin/cars/${car.id}/edit`} className="table-action">Edit</Link><button className="table-action delete-action" onClick={() => remove(car.id, `${car.brand} ${car.model}`)}>Delete</button></div>)}</div></div></div>
}
