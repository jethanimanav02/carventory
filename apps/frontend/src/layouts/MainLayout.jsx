import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useFavouritesContext } from '../context/FavouritesContext'
import { useCompareContext } from '../context/CompareContext'

export default function MainLayout() {
  const { favourites } = useFavouritesContext()
  const { compareCars } = useCompareContext()
  return <><Navbar favouriteCount={favourites.length} compareCount={compareCars.length} /><main><Outlet /></main><Footer /></>
}
