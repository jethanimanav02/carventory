import Button from './Button'
import Icon from './Icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchPanel() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const submit = (event) => { event.preventDefault(); navigate(`/cars${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ''}`) }
  return <form className="search-panel" onSubmit={submit}><div className="search-field search-field-main"><Icon name="search" size={20} /><div><label htmlFor="hero-search">Search inventory</label><input id="hero-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try “Hyundai Creta”" /></div></div><div className="search-field"><Icon name="map" size={19} /><div><label>Location</label><span>All locations</span></div><span className="chevron">⌄</span></div><div className="search-field"><div><label>Budget</label><span>Any price</span></div><span className="chevron">⌄</span></div><Button type="submit" icon="arrow">Search cars</Button></form>
}
