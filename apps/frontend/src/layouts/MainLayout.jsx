import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useCars from '../hooks/useCars'
import useFavourites from '../hooks/useFavourites'
import useCompare from '../hooks/useCompare'
import useRecentlyViewed from '../hooks/useRecentlyViewed'

export default function MainLayout() {
  const carState = useCars()
  const favouriteState = useFavourites(carState.publicCars)
  const compareState = useCompare()
  const recentlyViewedState = useRecentlyViewed(carState.publicCars)
  const outletContext = { ...carState, ...favouriteState, ...compareState, ...recentlyViewedState }
  return <><Navbar favouriteCount={favouriteState.favouriteIds.length} compareCount={compareState.compareIds.length} /><main><Outlet context={outletContext} /></main><Footer /></>
}
