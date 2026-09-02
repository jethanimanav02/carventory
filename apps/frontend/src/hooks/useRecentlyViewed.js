import { useCallback, useMemo } from 'react'
import useLocalStorage from './useLocalStorage'

const MAX_RECENT = 4

export default function useRecentlyViewed(cars = []) {
  const [recentIds, setRecentIds] = useLocalStorage('carventory-recently-viewed', [])
  const addRecentlyViewed = useCallback((id) => setRecentIds(current => [id, ...current.filter(item => item !== id)].slice(0, MAX_RECENT)), [setRecentIds])
  const recentlyViewed = useMemo(() => recentIds.map(id => cars.find(car => car.id === id)).filter(Boolean), [cars, recentIds])
  return { recentIds, recentlyViewed, addRecentlyViewed }
}
