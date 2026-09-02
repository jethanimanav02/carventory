import { useCallback, useMemo } from 'react'
import { cars as seedCars } from '../data/cars'
import useLocalStorage from './useLocalStorage'

export default function useCars() {
  const [cars, setCars] = useLocalStorage('carventory-cars', seedCars)

  const addCar = useCallback((car) => {
    const nextCar = { ...car, id: `${car.brand}-${car.model}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
    setCars(current => [nextCar, ...current])
    return nextCar
  }, [setCars])

  const updateCar = useCallback((id, updates) => {
    setCars(current => current.map(car => car.id === id ? { ...car, ...updates } : car))
  }, [setCars])

  const deleteCar = useCallback((id) => {
    setCars(current => current.filter(car => car.id !== id))
  }, [setCars])

  const publicCars = useMemo(() => cars.filter(car => car.status !== 'HIDDEN'), [cars])
  return { cars, publicCars, addCar, updateCar, deleteCar }
}
