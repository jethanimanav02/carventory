import { Link } from 'react-router-dom'
import Icon from '../components/Icons'
import { formatPrice } from '../data/cars'
import { useCarsContext } from '../context/CarContext'
import { useCompareContext } from '../context/CompareContext'

const rows = [['Price', car => formatPrice(car.price)], ['Year', car => car.year], ['KM driven', car => `${car.kmDriven.toLocaleString('en-IN')} km`], ['Fuel', car => car.fuel], ['Transmission', car => car.transmission], ['Engine', car => car.engine], ['Owners', car => car.owners]]

export default function Compare() {
  const { publicCars } = useCarsContext()
  const { compareCars: compareIds, toggleCompare } = useCompareContext()
  const compareCars = compareIds.map(id => publicCars.find(car => car.id === id)).filter(Boolean)
  return <div className="compare-page container"><div className="page-intro"><p className="kicker">MAKE THE CALL</p><h1>Side by <em>side.</em></h1><p>Lay out the details. Find the one that feels like yours.</p></div>{compareCars.length ? <div className="compare-table compare-live"><div className="compare-labels"><span>YOUR SHORTLIST</span><strong>{compareCars.length} of 3 cars selected</strong>{rows.map(([label]) => <span key={label}>{label}</span>)}</div>{compareCars.map(car => <div className="compare-car" key={car.id}><div className="compare-image"><img src={car.image} alt="" /></div><p className="eyebrow">{car.brand}</p><h3>{car.model}</h3>{rows.map(([, getValue]) => <span key={getValue.toString()}>{getValue(car)}</span>)}<Link to={`/cars/${car.id}`} className="text-link">View car <Icon name="arrow" size={15} /></Link><button className="remove-compare" onClick={() => toggleCompare(car.id)}>Remove</button></div>)}</div> : <div className="empty-compare"><Icon name="arrow" size={27} /><h2>Nothing to compare <em>yet.</em></h2><p>Add up to three cars from the inventory to see their details together.</p><Link to="/cars" className="text-link">Browse cars <Icon name="arrow" size={16} /></Link></div>}</div>
}
