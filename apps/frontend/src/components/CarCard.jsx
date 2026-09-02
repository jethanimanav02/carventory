import { Link } from 'react-router-dom'
import Icon from './Icons'
import { formatNumber, formatPrice } from '../data/cars'

export default function CarCard({ car, featured = false }) {
  return <article className={`car-card ${featured ? 'car-card-featured' : ''}`}>
    <Link to={`/cars/${car.id}`} className="car-image-wrap"><img src={car.image} alt={`${car.brand} ${car.model}`} /><span className={`status-tag ${car.status.toLowerCase()}`}>{car.status === 'RESERVED' ? 'Reserved' : 'Available'}</span><button className="heart-button" aria-label={`Save ${car.brand} ${car.model}`}><Icon name="heart" size={19} /></button></Link>
    <div className="car-card-body"><div className="car-card-heading"><div><p className="eyebrow">{car.year} · {car.condition}</p><Link to={`/cars/${car.id}`}><h3>{car.brand} {car.model}</h3></Link></div><strong>{formatPrice(car.price)}</strong></div><p className="car-variant">{car.variant}</p><div className="car-specs"><span><Icon name="gauge" size={16} />{formatNumber(car.kmDriven)} km</span><span><Icon name="fuel" size={16} />{car.fuel}</span><span>{car.transmission}</span></div></div>
  </article>
}
