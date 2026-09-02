import { useEffect, useState } from 'react'
import Button from './Button'
import FormField from './FormField'

export const emptyCar = {
  brand: '', model: '', variant: '', condition: 'USED', year: '', price: '', kmDriven: '', fuel: '', transmission: '', engine: '', color: '', owners: 1,
  registrationNumber: '', insuranceValidity: '', location: '', description: '', features: [], video: '', image: '', status: 'AVAILABLE',
}

const requiredFields = ['model', 'variant', 'year', 'price', 'kmDriven', 'fuel', 'transmission']

export default function CarForm({ initialCar = emptyCar, onSave, onCancel }) {
  const [form, setForm] = useState({ ...emptyCar, ...initialCar, features: initialCar.features || [] })
  const [featureText, setFeatureText] = useState((initialCar.features || []).join(', '))
  const [errors, setErrors] = useState({})

  useEffect(() => setForm({ ...emptyCar, ...initialCar, features: initialCar.features || [] }), [initialCar])
  const change = (event) => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: ['year', 'price', 'kmDriven', 'owners'].includes(name) ? value : value }))
    if (errors[name]) setErrors(current => ({ ...current, [name]: '' }))
  }
  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    requiredFields.forEach(field => { if (!String(form[field]).trim()) nextErrors[field] = 'This field is required.' })
    if (form.year && (Number(form.year) < 1980 || Number(form.year) > new Date().getFullYear() + 1)) nextErrors.year = 'Enter a realistic model year.'
    if (form.price && Number(form.price) <= 0) nextErrors.price = 'Price must be greater than zero.'
    if (form.kmDriven && Number(form.kmDriven) < 0) nextErrors.kmDriven = 'Distance cannot be negative.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    onSave({ ...form, year: Number(form.year), price: Number(form.price), kmDriven: Number(form.kmDriven), owners: Number(form.owners), features: featureText.split(',').map(item => item.trim()).filter(Boolean), image: form.image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85' })
  }

  return <form className="car-form" onSubmit={submit}>
    <div className="form-section-heading"><p className="eyebrow">01 / IDENTITY</p><h2>Tell us about the car.</h2></div>
    <div className="form-grid two-col"><FormField label="Brand" name="brand" value={form.brand} onChange={change} placeholder="e.g. Hyundai" /><FormField label="Model" name="model" value={form.model} onChange={change} placeholder="e.g. Creta" required error={errors.model} /><FormField label="Variant" name="variant" value={form.variant} onChange={change} placeholder="e.g. SX (O) 1.5 Petrol" required error={errors.variant} /><FormField label="Condition" name="condition" value={form.condition} onChange={change} options={['NEW', 'USED']} /></div>
    <div className="form-section-heading"><p className="eyebrow">02 / SPECIFICATIONS</p><h2>The useful details.</h2></div>
    <div className="form-grid three-col"><FormField label="Year" name="year" type="number" value={form.year} onChange={change} placeholder="2024" min="1980" required error={errors.year} /><FormField label="Price (₹)" name="price" type="number" value={form.price} onChange={change} placeholder="1250000" min="1" required error={errors.price} /><FormField label="KM driven" name="kmDriven" type="number" value={form.kmDriven} onChange={change} placeholder="25000" min="0" required error={errors.kmDriven} /><FormField label="Fuel" name="fuel" value={form.fuel} onChange={change} options={['Petrol', 'Diesel', 'Electric', 'CNG']} required error={errors.fuel} /><FormField label="Transmission" name="transmission" value={form.transmission} onChange={change} options={['Manual', 'Automatic']} required error={errors.transmission} /><FormField label="Engine" name="engine" value={form.engine} onChange={change} placeholder="1497 cc" /><FormField label="Colour" name="color" value={form.color} onChange={change} placeholder="Titan Grey" /><FormField label="Owners" name="owners" type="number" value={form.owners} onChange={change} min="1" max="5" /></div>
    <div className="form-section-heading"><p className="eyebrow">03 / PAPERWORK & PLACE</p><h2>Make it easy to verify.</h2></div>
    <div className="form-grid two-col"><FormField label="Registration number" name="registrationNumber" value={form.registrationNumber} onChange={change} placeholder="TS 09 AB 1234" /><FormField label="Insurance valid until" name="insuranceValidity" type="date" value={form.insuranceValidity} onChange={change} /><FormField label="Location" name="location" value={form.location} onChange={change} placeholder="Banjara Hills, Hyderabad" /></div>
    <div className="form-section-heading"><p className="eyebrow">04 / STORY & MEDIA</p><h2>Give it context.</h2></div>
    <div className="form-grid two-col"><FormField label="Description" name="description" value={form.description} onChange={change} placeholder="What makes this car worth a look?" rows="4" /><FormField label="Features / specifications" name="featureText" value={featureText} onChange={event => setFeatureText(event.target.value)} placeholder="Sunroof, 360° camera, leather seats" rows="4" /><FormField label="Primary photo URL" name="image" value={form.image} onChange={change} placeholder="Paste an image URL for the mock listing" /><FormField label="Car video URL" name="video" value={form.video} onChange={change} placeholder="Optional video URL" /></div>
    <div className="media-note">Media stays local to this demo. These URL fields are intentionally shaped so real storage can replace them in Experiment 4.</div>
    <div className="form-section-heading"><p className="eyebrow">05 / INVENTORY</p><h2>Set the listing live.</h2></div>
    <div className="form-grid two-col"><FormField label="Status" name="status" value={form.status} onChange={change} options={['AVAILABLE', 'RESERVED', 'SOLD', 'HIDDEN']} /></div>
    <div className="form-actions"><Button variant="outline" onClick={onCancel}>Cancel</Button><Button type="submit" icon="arrow">Save car</Button></div>
  </form>
}
