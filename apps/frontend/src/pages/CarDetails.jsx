import { useEffect } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Icon from '../components/Icons'
import CarCard from '../components/CarCard'
import { formatNumber, formatPrice } from '../data/cars'

export default function CarDetails() {
  const { carId } = useParams()
  const { publicCars, ...actions } = useOutletContext()
  const car = publicCars.find(item => item.id === carId) || publicCars[0]
  useEffect(() => { if (car) actions.addRecentlyViewed(car.id) }, [car?.id])
  if (!car) return <div className="empty-page container"><h1>No car found.</h1><Link to="/cars" className="text-link">Back to inventory <Icon name="arrow" size={16} /></Link></div>
  return <div className="detail-page"><div className="container breadcrumbs"><Link to="/cars">Inventory</Link><span>/</span><span>{car.brand} {car.model}</span></div><section className="container detail-grid"><div className="detail-gallery"><img src={car.image} alt={`${car.brand} ${car.model}`} /><div className="gallery-label">01 / 04 <span>VIEW GALLERY</span></div></div><div className="detail-info"><p className="eyebrow">{car.year} · {car.condition} · {car.status}</p><h1>{car.brand}<br /><em>{car.model}.</em></h1><p className="detail-variant">{car.variant}</p><div className="detail-price"><strong>{formatPrice(car.price)}</strong><span>or ₹24,500 / month<br />with Carventory Finance</span></div><div className="detail-spec-grid"><span><Icon name="gauge" />{formatNumber(car.kmDriven)} km</span><span><Icon name="fuel" />{car.fuel}</span><span><Icon name="calendar" />{car.year}</span><span><Icon name="bolt" />{car.transmission}</span></div><div className="detail-actions"><Button icon="arrow">Book a test drive</Button><Button variant="outline">WhatsApp us</Button></div><p className="detail-location"><Icon name="map" size={18} /> Available at <strong>{car.location}</strong></p></div></section><section className="container details-lower"><div><p className="eyebrow">THE DETAILS</p><h2>Good to know.</h2><p className="body-copy">{car.description} Every Carventory car includes a 7-day return promise and a complete inspection report.</p></div><div className="features-list">{car.features.map(feature => <span key={feature}><Icon name="check" size={17} />{feature}</span>)}</div></section><section className="container related-section"><div className="section-heading"><div><p className="eyebrow">YOU MAY ALSO LIKE</p><h2>Keep looking.</h2></div></div><div className="car-grid">{publicCars.filter(item => item.id !== car.id).slice(0, 3).map(item => <CarCard key={item.id} car={item} {...actions} />)}</div></section></div>
}
