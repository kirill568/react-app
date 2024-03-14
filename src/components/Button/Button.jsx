import PropTypes from 'prop-types'

const Button = ({ label = "default", color = "blue", onClick = () => { }, disabled, ...props }) => {
  let classes = "b-button"
  classes += ` b-button__color-${color}`

  return (
    <button 
      disabled={disabled ? "disabled" : false} 
      className={classes} 
      onClick={onClick} {...props}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default Button