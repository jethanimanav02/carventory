import { useMemo, useState } from 'react'

const defaultFilters = { search: '', condition: 'ALL', fuel: 'ALL', transmission: 'ALL', location: 'ALL', year: 'ALL', maxPrice: 'ALL' }

export default function useCarFilters(cars) {
  const [filters, setFilters] = useState(defaultFilters)
  const [sortBy, setSortBy] = useState('recommended')

  const updateFilter = (name, value) => setFilters(current => ({ ...current, [name]: value }))
  const clearFilters = () => setFilters(defaultFilters)

  const options = useMemo(() => ({
    fuels: [...new Set(cars.map(car => car.fuel))],
    locations: [...new Set(cars.map(car => car.location.split(', ').at(-1)))],
    years: [...new Set(cars.map(car => car.year))].sort((a, b) => b - a),
  }), [cars])

  const visibleCars = useMemo(() => {
    const query = filters.search.trim().toLowerCase()
    const filtered = cars.filter(car => {
      const searchable = [car.brand, car.model, car.variant, car.fuel, car.transmission, car.location].join(' ').toLowerCase()
      return (!query || searchable.includes(query))
        && (filters.condition === 'ALL' || car.condition === filters.condition)
        && (filters.fuel === 'ALL' || car.fuel === filters.fuel)
        && (filters.transmission === 'ALL' || car.transmission === filters.transmission)
        && (filters.location === 'ALL' || car.location.endsWith(filters.location))
        && (filters.year === 'ALL' || car.year === Number(filters.year))
        && (filters.maxPrice === 'ALL' || car.price <= Number(filters.maxPrice))
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price
      if (sortBy === 'priceDesc') return b.price - a.price
      if (sortBy === 'yearDesc') return b.year - a.year
      if (sortBy === 'yearAsc') return a.year - b.year
      if (sortBy === 'kmAsc') return a.kmDriven - b.kmDriven
      return 0
    })
  }, [cars, filters, sortBy])

  return { filters, updateFilter, clearFilters, sortBy, setSortBy, visibleCars, options, hasFilters: Object.values(filters).some(value => value !== 'ALL' && value !== '') }
}
