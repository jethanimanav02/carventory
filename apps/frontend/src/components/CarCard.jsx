import { Link } from 'react-router-dom'
import Icon from './Icons'
import { formatNumber, formatPrice } from '../data/cars'

export default function CarCard({ car, featured = false, isFavourite = () => false, toggleFavourite = () => {}, isComparing = () => false, toggleCompare = () => {} }) {
  return <article className={`car-card ${featured ? 'car-card-featured' : ''}`}>
    <div className="car-image-wrap"><Link to={`/cars/${car.id}`}><img src={car.image} alt={`${car.brand} ${car.model}`} /></Link><span className={`status-tag ${car.status.toLowerCase()}`}>{car.status === 'RESERVED' ? 'Reserved' : car.status === 'SOLD' ? 'Sold' : 'Available'}</span><button className={`heart-button ${isFavourite(car.id) ? 'is-favourite' : ''}`} onClick={() => toggleFavourite(car.id)} aria-label={`${isFavourite(car.id) ? 'Remove' : 'Save'} ${car.brand} ${car.model}`}><Icon name="heart" size={19} /></button></div>
    <div className="car-card-body"><div className="car-card-heading"><div><p className="eyebrow">{car.year} · {car.condition}</p><Link to={`/cars/${car.id}`}><h3>{car.brand} {car.model}</h3></Link></div><strong>{formatPrice(car.price)}</strong></div><p className="car-variant">{car.variant}</p><div className="car-specs"><span><Icon name="gauge" size={16} />{formatNumber(car.kmDriven)} km</span><span><Icon name="fuel" size={16} />{car.fuel}</span><span>{car.transmission}</span></div><button className={`compare-toggle ${isComparing(car.id) ? 'selected' : ''}`} onClick={() => toggleCompare(car.id)}>{isComparing(car.id) ? 'Added to compare' : 'Add to compare'} <Icon name="arrow" size={14} /></button></div>
  </article>
}
