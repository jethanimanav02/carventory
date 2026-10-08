import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CarCard from '../components/CarCard'
import useCarFilters from '../hooks/useCarFilters'
import { useCarsContext } from '../context/CarContext'

export default function Cars() {
  const [searchParams] = useSearchParams()
  const [view, setView] = useState('grid')
  const { loading, error } = useCarsContext()
  const {
    filters,
    updateFilter,
    clearFilters,
    sortBy,
    setSortBy,
    visibleCars,
    options,
    hasFilters
  } = useCarFilters()

  useEffect(() => {
    if (searchParams.get('search')) {
      updateFilter('search', searchParams.get('search'))
    }
  }, [searchParams])

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 16px', textAlign: 'center' }}>
        <h2>Loading inventory...</h2>
        <p className="subtext">Fetching cars from database.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '40px 16px' }}>
        <div className="status-banner status-banner-error">
          Unable to load cars. Make sure the backend server is running.
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1>Car Inventory</h1>
        <p className="subtext" style={{ margin: 0 }}>
          Search and filter verified vehicles ({visibleCars.length} available)
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* Filters Sidebar */}
        <aside className="card" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '14px' }}>
            Filter Inventory
          </h3>

          <div className="form-group">
            <label className="form-label" htmlFor="filter-search">Search</label>
            <input
              id="filter-search"
              type="text"
              className="form-input"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Brand, model, or variant..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Condition</label>
            <select
              className="form-select"
              value={filters.condition}
              onChange={(e) => updateFilter('condition', e.target.value)}
            >
              <option value="ALL">All Conditions</option>
              <option value="NEW">New</option>
              <option value="USED">Used</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Fuel Type</label>
            <select
              className="form-select"
              value={filters.fuel}
              onChange={(e) => updateFilter('fuel', e.target.value)}
            >
              <option value="ALL">All Fuel Types</option>
              {options.fuels.map((fuel) => (
                <option key={fuel} value={fuel}>{fuel}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Transmission</label>
            <select
              className="form-select"
              value={filters.transmission}
              onChange={(e) => updateFilter('transmission', e.target.value)}
            >
              <option value="ALL">All Transmissions</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <select
              className="form-select"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
            >
              <option value="ALL">All Locations</option>
              {options.locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Max Price</label>
            <select
              className="form-select"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
            >
              <option value="ALL">Any Price</option>
              <option value="1000000">Up to ₹10 Lakh</option>
              <option value="1500000">Up to ₹15 Lakh</option>
              <option value="2000000">Up to ₹20 Lakh</option>
              <option value="3000000">Up to ₹30 Lakh</option>
            </select>
          </div>

          {hasFilters && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={clearFilters}
              style={{ width: '100%', marginTop: '6px' }}
            >
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Results Area */}
        <main style={{ gridColumn: 'span 2' }}>
          {/* Toolbar */}
          <div
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              padding: '10px 14px',
              marginBottom: '16px'
            }}
          >
            <div style={{ fontSize: '13px', color: '#475569' }}>
              Showing <strong>{visibleCars.length}</strong> of <strong>{visibleCars.length}</strong> cars
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: 'auto', padding: '5px 10px', fontSize: '13px' }}
              >
                <option value="recommended">Sort: Default</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="yearDesc">Year: Newest First</option>
                <option value="kmAsc">KM: Low to High</option>
              </select>

              <button
                type="button"
                className={`btn btn-sm ${view === 'grid' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setView('grid')}
              >
                Grid
              </button>
              <button
                type="button"
                className={`btn btn-sm ${view === 'list' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setView('list')}
              >
                List
              </button>
            </div>
          </div>

          {/* Car Grid / List */}
          {visibleCars.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
              <h3>No cars found</h3>
              <p className="subtext">
                No vehicles matched your filter settings. Try clearing some filters.
              </p>
              <button type="button" className="btn btn-primary btn-sm" onClick={clearFilters}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: view === 'list' ? '1fr' : 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '16px'
              }}
            >
              {visibleCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
