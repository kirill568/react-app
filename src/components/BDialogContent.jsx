import DialogContent from '@mui/material/DialogContent'
import PropTypes from 'prop-types'


const BDialogContent = ({ children }) => {
  return (
    <DialogContent>
      {children}
    </DialogContent>
  )
}

BDialogContent.propTypes = {
  children: PropTypes.node
}

export default BDialogContent