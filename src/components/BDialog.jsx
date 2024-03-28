import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import PropTypes from 'prop-types'

const BDialog = ({ title = "Dialog title", handleClose = () => {}, open = false, children }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>

      {children}
    </Dialog>
  )
}

BDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node
}

export default BDialog