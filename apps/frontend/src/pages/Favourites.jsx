import { Link } from 'react-router-dom'
import CarCard from '../components/CarCard'
import { useCarsContext } from '../context/CarContext'
import { useFavouritesContext } from '../context/FavouritesContext'

export default function Favourites() {
  const { publicCars } = useCarsContext()
  const { favourites } = useFavouritesContext()
  const favouriteCars = publicCars.filter((car) => favourites.includes(car.id))

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1>Favourite Cars</h1>
        <p className="subtext" style={{ margin: 0 }}>
          Vehicles saved to your shortlist ({favouriteCars.length} saved)
        </p>
      </div>

      {favouriteCars.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h3>No cars added to favourites yet.</h3>
          <p className="subtext" style={{ marginBottom: '16px' }}>
            Click the heart icon on any car card to save it here for quick access.
          </p>
          <Link to="/cars" className="btn btn-primary">
            Browse Cars
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px'
          }}
        >
          {favouriteCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  )
}
