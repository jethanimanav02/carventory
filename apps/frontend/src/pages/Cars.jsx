import { useState } from 'react'
import CarCard from '../components/CarCard'
import Icon from '../components/Icons'
import { cars } from '../data/cars'

export default function Cars() {
  const [view, setView] = useState('grid')
  return <div className="page-shell"><section className="page-hero container"><div><p className="kicker">THE COLLECTION</p><h1>Find your <em>next car.</em></h1><p>Every car here has been chosen, checked and prepared for a better ownership story.</p></div><div className="inventory-count"><strong>42</strong><span>cars in<br />the collection</span></div></section><section className="container inventory-layout"><aside className="filter-rail"><p className="eyebrow">REFINE BY</p><button className="filter-row">Make & model <span>+</span></button><button className="filter-row">Price range <span>+</span></button><button className="filter-row">Fuel type <span>+</span></button><button className="filter-row">Transmission <span>+</span></button><button className="filter-row">Year <span>+</span></button><div className="filter-location"><Icon name="map" size={18} /><span>Showing cars near<br /><strong>Hyderabad</strong></span></div></aside><div className="inventory-results"><div className="results-toolbar"><span><strong>4 cars</strong> that might be yours</span><div className="toolbar-actions"><button className={view === 'grid' ? 'selected' : ''} onClick={() => setView('grid')}>Grid</button><button className={view === 'list' ? 'selected' : ''} onClick={() => setView('list')}>List</button><button className="sort-button">Sort: Recommended <span>⌄</span></button></div></div><div className={`car-grid ${view === 'list' ? 'list-view' : ''}`}>{cars.map(car => <CarCard key={car.id} car={car} />)}</div></div></section></div>
}
