import { Link } from 'react-router-dom'
import AdminNav from '../components/AdminNav'
import { formatPrice } from '../data/cars'
import { useCarsContext } from '../context/CarContext'

export default function AdminDashboard() {
  const { cars } = useCarsContext()

  const counts = {
    total: cars.length,
    available: cars.filter((car) => car.status === 'AVAILABLE').length,
    reserved: cars.filter((car) => car.status === 'RESERVED').length,
    sold: cars.filter((car) => car.status === 'SOLD').length
  }

  const recentCars = cars.slice(0, 5)

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <AdminNav />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>Admin Dashboard</h1>
          <p className="subtext" style={{ margin: 0 }}>
            Dealership inventory status and overview
          </p>
        </div>
        <Link to="/admin/cars/new" className="btn btn-primary btn-sm">
          + Add New Car
        </Link>
      </div>

      {/* 4 Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <div className="card" style={{ borderLeft: '3px solid #2563eb' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>TOTAL CARS</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', margin: '4px 0' }}>
            {counts.total}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>In database</div>
        </div>

        <div className="card" style={{ borderLeft: '3px solid #16a34a' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>AVAILABLE</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#16a34a', margin: '4px 0' }}>
            {counts.available}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Ready for sale</div>
        </div>

        <div className="card" style={{ borderLeft: '3px solid #d97706' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>RESERVED</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#d97706', margin: '4px 0' }}>
            {counts.reserved}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Booking in progress</div>
        </div>

        <div className="card" style={{ borderLeft: '3px solid #64748b' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>SOLD</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#64748b', margin: '4px 0' }}>
            {counts.sold}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Completed sales</div>
        </div>
      </div>

      {/* Recent Cars Table */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3>Recent Inventory</h3>
          <Link to="/admin/inventory" className="btn btn-outline btn-sm">
            View All Inventory →
          </Link>
        </div>

        {recentCars.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>No cars in database yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Image</th>
                  <th>Car Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th style={{ width: '90px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentCars.map((car) => (
                  <tr key={car.id}>
                    <td>
                      <img
                        src={car.image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=100&q=80'}
                        alt=""
                        style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '3px' }}
                      />
                    </td>
                    <td>
                      <strong>{car.brand} {car.model}</strong>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        {car.year} · {car.variant}
                      </div>
                    </td>
                    <td>
                      <strong style={{ color: '#2563eb' }}>{formatPrice(car.price)}</strong>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          car.status === 'AVAILABLE'
                            ? 'badge-available'
                            : car.status === 'RESERVED'
                            ? 'badge-reserved'
                            : car.status === 'SOLD'
                            ? 'badge-sold'
                            : 'badge-hidden'
                        }`}
                      >
                        {car.status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/admin/cars/${car.id}/edit`} className="btn btn-sm btn-outline">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Action Shortcuts */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link to="/admin/inventory" className="btn btn-outline">
          Manage Inventory
        </Link>
        <Link to="/admin/cars/new" className="btn btn-outline">
          Add New Vehicle
        </Link>
        <Link to="/admin/enquiries" className="btn btn-outline">
          View Customer Enquiries
        </Link>
      </div>
    </div>
  )
}
