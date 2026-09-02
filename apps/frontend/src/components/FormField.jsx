export default function FormField({ label, name, value, onChange, error, type = 'text', options, placeholder, required = false, min, max, step, rows }) {
  return <label className={`form-field ${error ? 'has-error' : ''}`}>
    <span>{label}{required && <b>*</b>}</span>
    {options ? <select name={name} value={value} onChange={onChange}><option value="">Select {label.toLowerCase()}</option>{options.map(option => <option value={option} key={option}>{option}</option>)}</select>
      : rows ? <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} />
      : <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} min={min} max={max} step={step} />}
    {error && <small>{error}</small>}
  </label>
}
