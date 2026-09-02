import { Link } from 'react-router-dom'
import AdminNav from '../components/AdminNav'
import Icon from '../components/Icons'

const enquiries = [
  { name: 'Maya Rao', car: 'Hyundai Creta SX (O)', time: '12 min ago', status: 'NEW', note: 'Asked about a home test drive.' },
  { name: 'Kabir Mehta', car: 'Tata Nexon EV Max', time: '1 hr ago', status: 'FOLLOW-UP', note: 'Requested finance options.' },
  { name: 'Ananya Shah', car: 'Honda City VX', time: 'Yesterday', status: 'CONTACTED', note: 'Prefers a Saturday appointment.' },
]

export default function AdminEnquiries() { return <div className="admin-page admin-page-inner"><div className="container"><AdminNav /><div className="admin-top"><div><p className="kicker">CARVENTORY / ENQUIRIES</p><h1>People who are <em>looking.</em></h1></div><Link to="/admin" className="text-link">Dashboard <Icon name="arrow" size={16} /></Link></div><div className="enquiry-list">{enquiries.map(item => <div className="enquiry-row" key={item.name}><div className="enquiry-avatar">{item.name.split(' ').map(part => part[0]).join('')}</div><div><strong>{item.name}</strong><span>{item.car} · {item.time}</span><p>{item.note}</p></div><span className={`status-tag ${item.status.toLowerCase().replace('-', '')}`}>{item.status}</span><button className="table-action">Open <Icon name="arrow" size={15} /></button></div>)}</div></div></div> }
