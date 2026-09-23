import { createContext, useContext, useMemo } from 'react'
import useCompare from '../hooks/useCompare'

const CompareContext = createContext(null)

export function CompareProvider({ children }) {
  const state = useCompare()
  const value = useMemo(() => ({ compareCars: state.compareIds, ...state, isInCompare: state.isComparing, removeFromCompare: state.toggleCompare, clearCompare: () => state.setCompareIds([]) }), [state])
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

export function useCompareContext() {
  const context = useContext(CompareContext)
  if (!context) throw new Error('useCompareContext must be used inside a CompareProvider.')
  return context
}
