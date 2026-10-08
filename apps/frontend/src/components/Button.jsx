import { Link } from 'react-router-dom'

export default function Button({
  children,
  to,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  let btnClass = 'btn-primary'
  if (variant === 'outline') btnClass = 'btn-outline'
  else if (variant === 'secondary' || variant === 'light') btnClass = 'btn-secondary'
  else if (variant === 'danger') btnClass = 'btn-danger'
  else if (variant === 'dark') btnClass = 'btn-primary'

  const classes = `btn ${btnClass} ${className}`.trim()

  return to ? (
    <Link className={classes} to={to} {...props}>
      {children}
    </Link>
  ) : (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  )
}
