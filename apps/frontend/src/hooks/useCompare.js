import { useCallback } from 'react'
import useLocalStorage from './useLocalStorage'

const MAX_COMPARE = 3

export default function useCompare() {
  const [compareIds, setCompareIds] = useLocalStorage('carventory-compare', [])
  const toggleCompare = useCallback((id) => setCompareIds(current => {
    if (current.includes(id)) return current.filter(item => item !== id)
    return current.length < MAX_COMPARE ? [...current, id] : current
  }), [setCompareIds])
  return { compareIds, toggleCompare, isComparing: id => compareIds.includes(id), canAdd: compareIds.length < MAX_COMPARE, setCompareIds }
}
