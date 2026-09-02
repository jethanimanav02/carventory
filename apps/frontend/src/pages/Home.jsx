import { Link } from 'react-router-dom'
import Button from '../components/Button'
import CarCard from '../components/CarCard'
import Icon from '../components/Icons'
import SearchPanel from '../components/SearchPanel'
import { cars } from '../data/cars'

export default function Home() {
  return <>
    <section className="hero"><div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" /><div className="container hero-content"><p className="kicker">THE CARVENTORY EDIT · 2026</p><h1>Find a car<br /><em>worth keeping.</em></h1><p className="hero-subtitle">A thoughtfully selected collection of inspected cars,<br className="desktop-only" /> ready for wherever you’re going next.</p><SearchPanel /><div className="hero-note"><span className="pulse-dot" /> 42 cars available today <span className="note-rule" /> Free home test drives in Hyderabad</div></div><div className="hero-car-caption">01 / 04 <span>FEATURED COLLECTION</span></div></section>
    <section className="section container featured-section"><div className="section-heading"><div><p className="eyebrow">JUST IN</p><h2>Cars with a little <em>more.</em></h2></div><Link to="/cars" className="text-link">View all inventory <Icon name="arrow" size={17} /></Link></div><div className="car-grid">{cars.slice(0, 3).map(car => <CarCard key={car.id} car={car} featured />)}</div></section>
    <section className="manifesto"><div className="container manifesto-grid"><div><p className="eyebrow">THE CARVENTORY PROMISE</p><h2>Buy with clarity.<br /><em>Drive with confidence.</em></h2></div><div className="manifesto-copy"><p>Every car in our collection earns its place. We inspect the details, tell you the whole story, and leave room for the right choice to feel simple.</p><Button to="/cars" variant="dark" icon="arrow">Explore the collection</Button></div></div></section>
    <section className="section container way-section"><div className="section-heading"><div><p className="eyebrow">A BETTER WAY TO SHOP</p><h2>Less browsing.<br /><em>More belonging.</em></h2></div></div><div className="way-grid"><div className="way-card way-card-large"><span className="way-number">01</span><Icon name="check" size={27} /><h3>Inspected, honestly</h3><p>200+ checkpoints, a transparent history and no awkward surprises after you arrive.</p></div><div className="way-card"><span className="way-number">02</span><Icon name="calendar" size={27} /><h3>Take your time</h3><p>Book a home test drive or visit us. Your decision should never feel rushed.</p></div><div className="way-card"><span className="way-number">03</span><Icon name="bolt" size={27} /><h3>Ready to go</h3><p>Paperwork handled, cars serviced and a seven-day return promise included.</p></div></div></section>
    <section className="cta-strip"><div className="container cta-inner"><div><p className="eyebrow">NOT SURE WHERE TO START?</p><h2>Let’s find your<br /><em>right fit.</em></h2></div><Button to="/cars" variant="light" icon="arrow">Browse all cars</Button></div></section>
  </>
}
