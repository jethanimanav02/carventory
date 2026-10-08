import { Link } from 'react-router-dom'
import { formatNumber, formatPrice } from '../data/cars'
import { useFavouritesContext } from '../context/FavouritesContext'
import { useCompareContext } from '../context/CompareContext'

export default function CarCard({ car }) {
  const { isFavourite, toggleFavourite } = useFavouritesContext()
  const { isComparing, toggleCompare } = useCompareContext()

  const statusClass =
    car.status === 'AVAILABLE'
      ? 'badge-available'
      : car.status === 'RESERVED'
      ? 'badge-reserved'
      : car.status === 'SOLD'
      ? 'badge-sold'
      : 'badge-hidden'

  const statusLabel =
    car.status === 'RESERVED'
      ? 'Reserved'
      : car.status === 'SOLD'
      ? 'Sold'
      : car.status === 'HIDDEN'
      ? 'Hidden'
      : 'Available'

  const fav = isFavourite(car.id)
  const comparing = isComparing(car.id)

  return (
    <article className="car-card-simple">
      <div className="car-card-img-wrap">
        <Link to={`/cars/${car.id}`} tabIndex={-1}>
          <img
            src={car.image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80'}
            alt={`${car.brand} ${car.model}`}
            className="car-card-img"
          />
        </Link>
        <span className={`badge ${statusClass} car-card-badge`}>
          {statusLabel}
        </span>
        <button
          className={`car-card-fav-btn ${fav ? 'active' : ''}`}
          onClick={() => toggleFavourite(car.id)}
          title={fav ? 'Remove from favourites' : 'Save to favourites'}
          aria-label={`${fav ? 'Remove' : 'Save'} ${car.brand} ${car.model}`}
        >
          {fav ? '♥' : '♡'}
        </button>
      </div>

      <div className="car-card-content">
        <Link to={`/cars/${car.id}`}>
          <div className="car-card-title">{car.brand} {car.model}</div>
        </Link>
        <div className="car-card-subtitle">{car.year} · {car.variant}</div>
        <div className="car-card-price">{formatPrice(car.price)}</div>

        <div className="car-card-specs">
          <span>{formatNumber(car.kmDriven)} km</span>
          <span>•</span>
          <span>{car.fuel}</span>
          <span>•</span>
          <span>{car.transmission}</span>
        </div>

        <div className="car-card-actions">
          <Link to={`/cars/${car.id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
            View Details
          </Link>
          <button
            type="button"
            className={`btn btn-sm ${comparing ? 'btn-secondary' : 'btn-outline'}`}
            onClick={() => toggleCompare(car.id)}
            title={comparing ? 'Remove from compare' : 'Add to compare'}
          >
            {comparing ? 'Compared ✓' : '+ Compare'}
          </button>
        </div>
      </div>
    </article>
  )
}
