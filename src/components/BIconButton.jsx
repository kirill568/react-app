import IconButton from '@mui/material/IconButton'
import PropTypes from 'prop-types'

const BIconButton = ({ onClick = () => { }, size = "small", color = "primary", ariaLabel = "", edge= "", sx= {}, children }) => {
  return (
    <IconButton 
      size={size} 
      color={color} 
      aria-label={ariaLabel}
      onClick={onClick}
      sx={sx}
    >
      {children}
    </IconButton>
  )
}

BIconButton.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  children: PropTypes.node
}

export default BIconButton