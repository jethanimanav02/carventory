import { Link } from 'react-router-dom'
import AdminNav from '../components/AdminNav'

const enquiries = [
  { name: 'Maya Rao', car: 'Hyundai Creta SX (O)', time: '12 min ago', status: 'NEW', note: 'Asked about a home test drive.' },
  { name: 'Kabir Mehta', car: 'Tata Nexon EV Max', time: '1 hr ago', status: 'FOLLOW-UP', note: 'Requested finance options.' },
  { name: 'Ananya Shah', car: 'Honda City VX', time: 'Yesterday', status: 'CONTACTED', note: 'Prefers a Saturday appointment.' }
]

export default function AdminEnquiries() {
  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <AdminNav />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>Customer Enquiries</h1>
          <p className="subtext" style={{ margin: 0 }}>
            Recent vehicle enquiry leads received by the dealership
          </p>
        </div>
        <Link to="/admin" className="btn btn-outline btn-sm">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Vehicle Interested</th>
              <th>Time</th>
              <th>Status</th>
              <th>Customer Note</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((item) => (
              <tr key={item.name}>
                <td>
                  <strong>{item.name}</strong>
                </td>
                <td>{item.car}</td>
                <td style={{ color: '#64748b', fontSize: '13px' }}>{item.time}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === 'NEW'
                        ? 'badge-available'
                        : item.status === 'FOLLOW-UP'
                        ? 'badge-reserved'
                        : 'badge-sold'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td style={{ color: '#475569', fontSize: '13px' }}>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
