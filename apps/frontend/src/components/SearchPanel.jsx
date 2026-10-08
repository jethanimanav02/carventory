import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchPanel() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const submit = (event) => {
    event.preventDefault()
    navigate(`/cars${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ''}`)
  }

  return (
    <form
      onSubmit={submit}
      style={{
        display: 'flex',
        gap: '8px',
        maxWidth: '540px',
        margin: '16px 0'
      }}
    >
      <input
        type="text"
        className="form-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by brand or model (e.g. Honda, Creta)..."
        style={{ flex: 1 }}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  )
}
