let cachedBaseUrl = import.meta.env.VITE_API_URL || null

async function getBaseUrl() {
  if (cachedBaseUrl) return cachedBaseUrl

  // Auto-detect whether backend is running on default 8080 or fallback 8081
  const candidates = ['http://localhost:8080/api', 'http://localhost:8081/api']
  for (const candidate of candidates) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 1200)
      const res = await fetch(`${candidate}/cars`, { method: 'GET', signal: controller.signal })
      clearTimeout(timeoutId)
      if (res.ok) {
        cachedBaseUrl = candidate
        return candidate
      }
    } catch {
      // continue to next candidate
    }
  }
  cachedBaseUrl = 'http://localhost:8080/api'
  return cachedBaseUrl
}

async function request(path, options = {}) {
  const baseUrl = await getBaseUrl()
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.message || `Car API request failed (${response.status}).`)
  }
  return response.status === 204 ? null : response.json()
}

export const fromApiCar = (car) => {
  if (!car) return car
  return {
    ...car,
    id: String(car.id || car._id || ''),
    owners: car.numberOfOwners ?? 1,
    image: car.photos?.[0] || car.image || '',
    features: Array.isArray(car.features) ? car.features : [],
    photos: Array.isArray(car.photos) ? car.photos : (car.image ? [car.image] : []),
  }
}

export const toApiCar = (car) => {
  const { id, _id, owners, image, createdAt, updatedAt, featureText, ...rest } = car
  return {
    ...rest,
    brand: (car.brand || '').trim(),
    model: (car.model || '').trim(),
    variant: (car.variant || '').trim(),
    year: Number(car.year),
    price: Number(car.price),
    kmDriven: Number(car.kmDriven || 0),
    fuel: car.fuel || 'Petrol',
    transmission: car.transmission || 'Manual',
    engine: car.engine || '',
    color: car.color || '',
    numberOfOwners: Number(owners ?? car.numberOfOwners ?? 1),
    registrationNumber: car.registrationNumber || '',
    insuranceValidity: car.insuranceValidity ? car.insuranceValidity : null,
    location: (car.location || 'Mumbai, Maharashtra').trim(),
    description: car.description || '',
    photos: Array.isArray(car.photos) && car.photos.length > 0 ? car.photos : (image ? [image] : []),
    video: car.video || '',
    features: Array.isArray(car.features) ? car.features : [],
    status: car.status || 'AVAILABLE',
    condition: car.condition || 'USED',
  }
}

export const fetchCars = (params = {}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  )
  return request(`/cars${query.toString() ? `?${query}` : ''}`).then((cars) =>
    Array.isArray(cars) ? cars.map(fromApiCar) : []
  )
}

export const fetchCarById = (id) => request(`/cars/${id}`).then(fromApiCar)

export const createCar = (car) =>
  request('/cars', { method: 'POST', body: JSON.stringify(toApiCar(car)) }).then(fromApiCar)

export const updateCar = (id, car) =>
  request(`/cars/${id}`, { method: 'PUT', body: JSON.stringify(toApiCar(car)) }).then(fromApiCar)

export const deleteCar = (id) => request(`/cars/${id}`, { method: 'DELETE' })
