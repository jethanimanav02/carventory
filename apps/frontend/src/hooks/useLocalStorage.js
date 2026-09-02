import { useCallback, useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Local persistence is a convenience; the in-memory value remains usable.
    }
  }, [key, value])

  const reset = useCallback(() => setValue(initialValue), [initialValue])
  return [value, setValue, reset]
}
