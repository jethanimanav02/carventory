import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { CarProvider } from './context/CarContext'
import { FavouritesProvider } from './context/FavouritesContext'
import { CompareProvider } from './context/CompareContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarProvider>
          <FavouritesProvider>
            <CompareProvider>
              <App />
            </CompareProvider>
          </FavouritesProvider>
        </CarProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
