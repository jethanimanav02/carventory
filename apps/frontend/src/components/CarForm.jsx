import { useEffect, useState } from 'react'
import FormField from './FormField'

export const emptyCar = {
  brand: '',
  model: '',
  variant: '',
  condition: 'USED',
  year: '',
  price: '',
  kmDriven: '',
  fuel: '',
  transmission: '',
  engine: '',
  color: '',
  owners: 1,
  registrationNumber: '',
  insuranceValidity: '',
  location: '',
  description: '',
  features: [],
  video: '',
  image: '',
  status: 'AVAILABLE'
}

const requiredFields = ['brand', 'model', 'variant', 'year', 'price', 'kmDriven', 'fuel', 'transmission', 'location']

export default function CarForm({ initialCar = emptyCar, onSave, onCancel }) {
  const [form, setForm] = useState({ ...emptyCar, ...initialCar, features: initialCar.features || [] })
  const [featureText, setFeatureText] = useState((initialCar.features || []).join(', '))
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm({ ...emptyCar, ...initialCar, features: initialCar.features || [] })
    setFeatureText((initialCar.features || []).join(', '))
  }, [initialCar])

  const change = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
  }

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    requiredFields.forEach((field) => {
      if (!String(form[field]).trim()) nextErrors[field] = 'This field is required.'
    })
    if (form.year && (Number(form.year) < 1980 || Number(form.year) > new Date().getFullYear() + 1)) {
      nextErrors.year = 'Enter a realistic model year.'
    }
    if (form.price && Number(form.price) <= 0) {
      nextErrors.price = 'Price must be greater than zero.'
    }
    if (form.kmDriven && Number(form.kmDriven) < 0) {
      nextErrors.kmDriven = 'Distance cannot be negative.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    onSave({
      ...form,
      year: Number(form.year),
      price: Number(form.price),
      kmDriven: Number(form.kmDriven),
      owners: Number(form.owners),
      features: featureText
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      image:
        form.image ||
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85'
    })
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '12px',
    marginBottom: '16px'
  }

  const sectionStyle = {
    fontSize: '15px',
    fontWeight: 600,
    color: '#334155',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '6px',
    marginBottom: '12px',
    marginTop: '16px'
  }

  return (
    <form className="card" onSubmit={submit} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={sectionStyle}>1. Basic Information</div>
      <div style={gridStyle}>
        <FormField label="Brand" name="brand" value={form.brand} onChange={change} placeholder="e.g. Honda" required error={errors.brand} />
        <FormField label="Model" name="model" value={form.model} onChange={change} placeholder="e.g. City" required error={errors.model} />
        <FormField label="Variant" name="variant" value={form.variant} onChange={change} placeholder="e.g. VX CVT" required error={errors.variant} />
        <FormField label="Condition" name="condition" value={form.condition} onChange={change} options={['NEW', 'USED']} />
      </div>

      <div style={sectionStyle}>2. Specifications</div>
      <div style={gridStyle}>
        <FormField label="Year" name="year" type="number" value={form.year} onChange={change} placeholder="2021" min="1980" required error={errors.year} />
        <FormField label="Price (₹)" name="price" type="number" value={form.price} onChange={change} placeholder="1190000" min="1" required error={errors.price} />
        <FormField label="KM Driven" name="kmDriven" type="number" value={form.kmDriven} onChange={change} placeholder="28000" min="0" required error={errors.kmDriven} />
        <FormField label="Fuel" name="fuel" value={form.fuel} onChange={change} options={['Petrol', 'Diesel', 'Electric', 'CNG']} required error={errors.fuel} />
        <FormField label="Transmission" name="transmission" value={form.transmission} onChange={change} options={['Manual', 'Automatic']} required error={errors.transmission} />
        <FormField label="Engine" name="engine" value={form.engine} onChange={change} placeholder="1498 cc" />
        <FormField label="Color" name="color" value={form.color} onChange={change} placeholder="White" />
        <FormField label="Owners" name="owners" type="number" value={form.owners} onChange={change} min="1" max="5" />
      </div>

      <div style={sectionStyle}>3. Registration & Location</div>
      <div style={gridStyle}>
        <FormField label="Registration Number" name="registrationNumber" value={form.registrationNumber} onChange={change} placeholder="MH 05 AB 1234" />
        <FormField label="Insurance Valid Until" name="insuranceValidity" type="date" value={form.insuranceValidity} onChange={change} />
        <FormField label="Location" name="location" value={form.location} onChange={change} placeholder="Ulhasnagar, Maharashtra" required error={errors.location} />
      </div>

      <div style={sectionStyle}>4. Description, Features & Media</div>
      <FormField label="Description" name="description" value={form.description} onChange={change} placeholder="Enter a brief description of the car..." rows="3" />
      <FormField label="Features (comma-separated)" name="featureText" value={featureText} onChange={(e) => setFeatureText(e.target.value)} placeholder="Touchscreen, Rear Camera, Sunroof" rows="2" />
      <div style={gridStyle}>
        <FormField label="Photo URL" name="image" value={form.image} onChange={change} placeholder="https://example.com/photo.jpg" />
        <FormField label="Video URL" name="video" value={form.video} onChange={change} placeholder="Optional video URL" />
      </div>

      <div style={sectionStyle}>5. Inventory Status</div>
      <div style={{ maxWidth: '240px' }}>
        <FormField label="Status" name="status" value={form.status} onChange={change} options={['AVAILABLE', 'RESERVED', 'SOLD', 'HIDDEN']} />
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginTop: '20px' }}>
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Car
        </button>
      </div>
    </form>
  )
}
