import { Link } from 'react-router-dom'
import { formatPrice } from '../data/cars'
import { useCarsContext } from '../context/CarContext'
import { useCompareContext } from '../context/CompareContext'

const specRows = [
  ['Brand', (car) => car.brand],
  ['Model', (car) => `${car.model} (${car.variant})`],
  ['Price', (car) => formatPrice(car.price)],
  ['Year of Make', (car) => car.year],
  ['Kilometres Driven', (car) => `${(car.kmDriven || 0).toLocaleString('en-IN')} km`],
  ['Fuel Type', (car) => car.fuel],
  ['Transmission', (car) => car.transmission],
  ['Engine', (car) => car.engine || '—'],
  ['Number of Owners', (car) => car.owners || 1],
  ['Condition', (car) => car.condition],
  ['Location', (car) => car.location]
]

export default function Compare() {
  const { publicCars } = useCarsContext()
  const { compareCars: compareIds, toggleCompare } = useCompareContext()
  const compareCars = compareIds.map((id) => publicCars.find((car) => car.id === id)).filter(Boolean)

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1>Vehicle Comparison</h1>
        <p className="subtext" style={{ margin: 0 }}>
          Side-by-side specification comparison ({compareCars.length} of 3 selected)
        </p>
      </div>

      {compareCars.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h3>No cars selected for comparison yet</h3>
          <p className="subtext" style={{ marginBottom: '16px' }}>
            Click "+ Compare" on any car card in the inventory to compare up to 3 cars side-by-side.
          </p>
          <Link to="/cars" className="btn btn-primary">
            Browse Cars
          </Link>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '200px' }}>Specification</th>
                {compareCars.map((car) => (
                  <th key={car.id} style={{ minWidth: '220px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <img
                        src={car.image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=400&q=80'}
                        alt={`${car.brand} ${car.model}`}
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                        {car.brand} {car.model}
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <Link to={`/cars/${car.id}`} className="btn btn-sm btn-primary" style={{ flex: 1 }}>
                          View
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                          onClick={() => toggleCompare(car.id)}
                          style={{ color: '#dc2626' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specRows.map(([label, getValue]) => (
                <tr key={label}>
                  <td style={{ fontWeight: 600, color: '#475569' }}>{label}</td>
                  {compareCars.map((car) => (
                    <td key={car.id}>
                      {label === 'Price' ? (
                        <strong style={{ color: '#2563eb' }}>{getValue(car)}</strong>
                      ) : (
                        getValue(car)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
