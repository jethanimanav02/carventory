import { Link } from 'react-router-dom'
import Icon from './Icons'

export default function Button({ children, to, variant = 'primary', icon, className = '', type = 'button' }) {
  const classes = `button button-${variant} ${className}`
  const content = <>{children}{icon && <Icon name={icon} size={17} />}</>
  return to ? <Link className={classes} to={to}>{content}</Link> : <button className={classes} type={type}>{content}</button>
}
