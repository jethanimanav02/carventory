import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CarCard from '../components/CarCard'
import { formatNumber, formatPrice } from '../data/cars'
import { useCarsContext } from '../context/CarContext'
import useRecentlyViewed from '../hooks/useRecentlyViewed'
import { useFavouritesContext } from '../context/FavouritesContext'
import { useCompareContext } from '../context/CompareContext'

export default function CarDetails() {
  const { carId } = useParams()
  const { publicCars, loading } = useCarsContext()
  const { addRecentlyViewed } = useRecentlyViewed(publicCars)
  const { toggleFavourite, isFavourite } = useFavouritesContext()
  const { toggleCompare, isComparing } = useCompareContext()

  const car = publicCars.find((item) => String(item.id) === String(carId))

  useEffect(() => {
    if (car) addRecentlyViewed(car.id)
  }, [car?.id, addRecentlyViewed])

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 16px', textAlign: 'center' }}>
        <h2>Loading car details...</h2>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="container" style={{ padding: '40px 16px', textAlign: 'center' }}>
        <h2>Car not found</h2>
        <p className="subtext">The requested vehicle could not be found in the inventory.</p>
        <Link to="/cars" className="btn btn-primary">
          Back to Inventory
        </Link>
      </div>
    )
  }

  const fav = isFavourite(car.id)
  const comparing = isComparing(car.id)
  const similarCars = publicCars.filter((item) => item.id !== car.id).slice(0, 3)

  return (
    <div className="container" style={{ paddingTop: '16px', paddingBottom: '40px' }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/cars">Cars</Link>
        <span>/</span>
        <span>{car.brand} {car.model}</span>
      </nav>

      {/* Main Details Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '28px'
        }}
      >
        {/* Car Image */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <img
            src={car.image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80'}
            alt={`${car.brand} ${car.model}`}
            style={{ width: '100%', height: '320px', objectFit: 'cover' }}
          />
          <div style={{ padding: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="badge badge-available">{car.status}</span>
            <span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>{car.condition}</span>
            <span style={{ fontSize: '13px', color: '#64748b', marginLeft: 'auto' }}>
              📍 {car.location}
            </span>
          </div>
        </div>

        {/* Car Specs Info Card */}
        <div className="card">
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{car.brand}</div>
          <h1 style={{ fontSize: '24px', marginBottom: '4px' }}>
            {car.brand} {car.model}
          </h1>
          <div className="subtext" style={{ marginBottom: '12px' }}>{car.variant}</div>

          <div
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#2563eb',
              padding: '10px 0',
              borderTop: '1px solid #e2e8f0',
              borderBottom: '1px solid #e2e8f0',
              marginBottom: '16px'
            }}
          >
            {formatPrice(car.price)}
          </div>

          {/* Key Specs Table */}
          <table className="table" style={{ fontSize: '13px', marginBottom: '16px' }}>
            <tbody>
              <tr>
                <td style={{ color: '#64748b', width: '40%' }}>Year of Make</td>
                <td><strong>{car.year}</strong></td>
              </tr>
              <tr>
                <td style={{ color: '#64748b' }}>Kilometres Driven</td>
                <td><strong>{formatNumber(car.kmDriven)} km</strong></td>
              </tr>
              <tr>
                <td style={{ color: '#64748b' }}>Fuel Type</td>
                <td><strong>{car.fuel}</strong></td>
              </tr>
              <tr>
                <td style={{ color: '#64748b' }}>Transmission</td>
                <td><strong>{car.transmission}</strong></td>
              </tr>
              {car.engine && (
                <tr>
                  <td style={{ color: '#64748b' }}>Engine</td>
                  <td><strong>{car.engine}</strong></td>
                </tr>
              )}
              {car.color && (
                <tr>
                  <td style={{ color: '#64748b' }}>Color</td>
                  <td><strong>{car.color}</strong></td>
                </tr>
              )}
              <tr>
                <td style={{ color: '#64748b' }}>Number of Owners</td>
                <td><strong>{car.owners || 1}</strong></td>
              </tr>
              {car.registrationNumber && (
                <tr>
                  <td style={{ color: '#64748b' }}>Registration Number</td>
                  <td><strong>{car.registrationNumber}</strong></td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn ${fav ? 'btn-secondary' : 'btn-outline'}`}
              onClick={() => toggleFavourite(car.id)}
            >
              {fav ? '♥ Saved in Favourites' : '♡ Add to Favourites'}
            </button>
            <button
              type="button"
              className={`btn ${comparing ? 'btn-secondary' : 'btn-outline'}`}
              onClick={() => toggleCompare(car.id)}
            >
              {comparing ? 'Added to Compare ✓' : '+ Compare'}
            </button>
            <Link to="/cars" className="btn btn-primary" style={{ marginLeft: 'auto' }}>
              Back to Inventory
            </Link>
          </div>
        </div>
      </div>

      {/* Description & Features Section */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <h3>Vehicle Description</h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
          {car.description || 'No additional description provided for this vehicle.'}
        </p>

        {car.features && car.features.length > 0 && (
          <div>
            <h3>Key Features</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
              {car.features.map((feature) => (
                <span
                  key={feature}
                  style={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    fontSize: '13px',
                    color: '#334155'
                  }}
                >
                  ✓ {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Similar Cars */}
      {similarCars.length > 0 && (
        <section>
          <h2>Similar Cars in Inventory</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginTop: '12px'
            }}
          >
            {similarCars.map((item) => (
              <CarCard key={item.id} car={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
