import Button from './Button'
import Icon from './Icons'

export default function SearchPanel() {
  return <div className="search-panel"><div className="search-field search-field-main"><Icon name="search" size={20} /><div><label>Search inventory</label><input placeholder="Try “Hyundai Creta”" /></div></div><div className="search-field"><Icon name="map" size={19} /><div><label>Location</label><span>All locations</span></div><span className="chevron">⌄</span></div><div className="search-field"><div><label>Budget</label><span>Any price</span></div><span className="chevron">⌄</span></div><Button icon="arrow">Search cars</Button></div>
}
