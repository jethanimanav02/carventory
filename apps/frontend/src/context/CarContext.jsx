import { createContext, useContext, useMemo } from 'react'
import useCars from '../hooks/useCars'

const CarContext = createContext(null)

export function CarProvider({ children }) {
  const inventory = useCars()
  const value = useMemo(() => ({
    ...inventory,
    updateCarStatus: (id, status) => inventory.updateCar(id, { status }),
  }), [inventory])
  return <CarContext.Provider value={value}>{children}</CarContext.Provider>
}

export function useCarsContext() {
  const context = useContext(CarContext)
  if (!context) throw new Error('useCarsContext must be used inside a CarProvider.')
  return context
}
