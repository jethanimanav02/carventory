import { useCallback, useEffect, useMemo, useState } from 'react'
import { createCar, deleteCar, fetchCars, updateCar } from '../services/carsApi'
import { cars as demoCars } from '../data/cars'

export default function useCars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refreshCars = useCallback(async () => {
    setLoading(true)
    try { setCars(await fetchCars()); setError('') } catch { setCars(demoCars); setError('') } finally { setLoading(false) }
  }, [])
  useEffect(() => { refreshCars() }, [refreshCars])

  const addCar = useCallback(async (car) => {
    try { const created = await createCar(car); setCars(current => [created, ...current]); return created } catch {
      const created = { ...car, id: `demo-${Date.now()}`, image: car.image || '' }
      setCars(current => [created, ...current]); return created
    }
  }, [])
  const update = useCallback(async (id, updates) => {
    try { const updated = await updateCar(id, updates); setCars(current => current.map(car => car.id === id ? updated : car)); return updated } catch {
      let updated
      setCars(current => current.map(car => { if (car.id !== id) return car; updated = { ...car, ...updates }; return updated }))
      return updated
    }
  }, [])
  const removeCar = useCallback(async (id) => { try { await deleteCar(id) } catch { /* Keep demo mode usable without the API. */ } setCars(current => current.filter(car => car.id !== id)) }, [])
  const publicCars = useMemo(() => cars.filter(car => car.status !== 'HIDDEN'), [cars])
  return { cars, publicCars, loading, error, refreshCars, addCar, updateCar: update, deleteCar: removeCar }
}
