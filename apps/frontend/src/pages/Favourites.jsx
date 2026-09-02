import { Link } from 'react-router-dom'
import Icon from '../components/Icons'
import { cars } from '../data/cars'

export default function Favourites() { return <div className="empty-page container"><div className="empty-icon"><Icon name="heart" size={30} /></div><p className="eyebrow">YOUR COLLECTION</p><h1>Cars you <em>love.</em></h1><p>Save a car while you browse and it’ll be waiting here when you come back.</p><Link to="/cars" className="text-link">Browse the collection <Icon name="arrow" size={17} /></Link><div className="saved-preview">{cars.slice(0, 2).map(car => <div key={car.id}><span>{car.brand} {car.model}</span><span>{car.year}</span></div>)}</div></div> }
