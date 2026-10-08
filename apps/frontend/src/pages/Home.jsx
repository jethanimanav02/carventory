import { Link } from 'react-router-dom'
import CarCard from '../components/CarCard'
import SearchPanel from '../components/SearchPanel'
import { useCarsContext } from '../context/CarContext'

export default function Home() {
  const { publicCars, loading, error } = useCarsContext()
  const featuredCars = publicCars.slice(0, 3)

  return (
    <div className="container" style={{ paddingTop: '24px', paddingBottom: '40px' }}>
      {/* Student Project Landing Banner */}
      <section
        className="card"
        style={{
          backgroundColor: '#ffffff',
          padding: '32px 24px',
          marginBottom: '28px',
          borderLeft: '4px solid #2563eb'
        }}
      >
        <span className="badge badge-available" style={{ marginBottom: '10px' }}>
          College Practical Project
        </span>
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>
          Car Inventory Management System
        </h1>
        <p className="subtext" style={{ maxWidth: '640px', marginBottom: '16px' }}>
          A full-stack web application developed to explore, search, compare, and manage
          used and new car inventory for dealership operations.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/cars" className="btn btn-primary">
            Browse All Cars ({publicCars.length})
          </Link>
          <Link to="/admin" className="btn btn-outline">
            Admin Dashboard
          </Link>
        </div>

        {/* Search Panel */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
            Quick Search
          </div>
          <SearchPanel />
        </div>
      </section>

      {/* Featured Inventory Section */}
      <section style={{ marginBottom: '32px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}
        >
          <div>
            <h2>Featured Inventory</h2>
            <p className="subtext" style={{ margin: 0 }}>
              Recently listed vehicles available in the database.
            </p>
          </div>
          <Link to="/cars" className="btn btn-outline btn-sm">
            View All ({publicCars.length}) →
          </Link>
        </div>

        {loading ? (
          <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
            <p style={{ margin: 0, color: '#64748b' }}>Loading cars from database...</p>
          </div>
        ) : error ? (
          <div className="status-banner status-banner-error">
            Unable to load cars. Make sure the backend server is running.
          </div>
        ) : featuredCars.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
            <p style={{ margin: 0, color: '#64748b' }}>No cars currently available in inventory.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}
          >
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>

      {/* Project Modules Overview (College Project Context) */}
      <section>
        <h2>Project Features</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginTop: '12px'
          }}
        >
          <div className="card">
            <h3>Search & Filtering</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Search across brand, model, and location with multi-attribute filtering for fuel type, transmission, condition, and price range.
            </p>
          </div>
          <div className="card">
            <h3>Vehicle Comparison</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Side-by-side spec comparison table for up to 3 selected vehicles to evaluate price, mileage, and features.
            </p>
          </div>
          <div className="card">
            <h3>Admin Inventory CRUD</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Admin management portal with real-time add, update, delete, and listing status management backed by MongoDB.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
