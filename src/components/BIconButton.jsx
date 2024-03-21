import IconButton from '@mui/material/IconButton';

const BIconButton = ({ onClick = () => { }, size = "small", color = "primary", ariaLabel = "", children }) => {
  return (
    <IconButton 
      size={size} 
      color={color} 
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </IconButton>
  )
}

export default BIconButton