import DialogActions from '@mui/material/DialogActions'
import PropTypes from 'prop-types'


const BDialogActions = ({ children }) => {
  return (
    <DialogActions style={{ justifyContent: "flex-end" }}>
      {children}
    </DialogActions>
  )
}

BDialogActions.propTypes = {
  children: PropTypes.node
}

export default BDialogActions