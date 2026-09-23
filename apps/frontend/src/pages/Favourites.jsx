import { Link } from 'react-router-dom'
import CarCard from '../components/CarCard'
import Icon from '../components/Icons'
import { useCarsContext } from '../context/CarContext'
import { useFavouritesContext } from '../context/FavouritesContext'

export default function Favourites() {
  const { publicCars } = useCarsContext()
  const { favourites } = useFavouritesContext()
  const favouriteCars = publicCars.filter(car => favourites.includes(car.id))
  if (!favouriteCars.length) return <div className="empty-page container"><div className="empty-icon"><Icon name="heart" size={30} /></div><p className="eyebrow">YOUR COLLECTION</p><h1>Cars you <em>love.</em></h1><p>Save a car while you browse and it’ll be waiting here when you come back.</p><Link to="/cars" className="text-link">Browse the collection <Icon name="arrow" size={17} /></Link></div>
  return <div className="saved-page container"><div className="page-intro"><p className="kicker">YOUR COLLECTION</p><h1>Cars you <em>love.</em></h1><p>{favouriteCars.length} saved car{favouriteCars.length > 1 ? 's' : ''} ready for another look.</p></div><div className="car-grid saved-grid">{favouriteCars.map(car => <CarCard key={car.id} car={car} />)}</div></div>
}
