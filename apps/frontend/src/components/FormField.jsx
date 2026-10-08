export default function FormField({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  options,
  placeholder,
  required = false,
  min,
  max,
  step,
  rows
}) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
        {required && <b>*</b>}
      </label>
      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="form-select"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      ) : rows ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="form-textarea"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="form-input"
        />
      )}
      {error && <div className="form-error">{error}</div>}
    </div>
  )
}
