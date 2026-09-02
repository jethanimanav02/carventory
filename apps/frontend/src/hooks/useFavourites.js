import { useCallback, useMemo } from 'react'
import useLocalStorage from './useLocalStorage'

export default function useFavourites(cars = []) {
  const [favouriteIds, setFavouriteIds] = useLocalStorage('carventory-favourites', [])
  const toggleFavourite = useCallback((id) => setFavouriteIds(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]), [setFavouriteIds])
  const isFavourite = useCallback((id) => favouriteIds.includes(id), [favouriteIds])
  const favouriteCars = useMemo(() => cars.filter(car => favouriteIds.includes(car.id)), [cars, favouriteIds])
  return { favouriteIds, favouriteCars, toggleFavourite, isFavourite }
}
