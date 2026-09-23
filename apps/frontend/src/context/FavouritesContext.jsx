import { createContext, useContext, useMemo } from 'react'
import useFavourites from '../hooks/useFavourites'

const FavouritesContext = createContext(null)

export function FavouritesProvider({ children }) {
  const state = useFavourites()
  const value = useMemo(() => ({ favourites: state.favouriteIds, ...state, clearFavourites: () => state.setFavouriteIds([]) }), [state])
  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

export function useFavouritesContext() {
  const context = useContext(FavouritesContext)
  if (!context) throw new Error('useFavouritesContext must be used inside a FavouritesProvider.')
  return context
}
