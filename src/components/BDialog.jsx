import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

const BDialog = ({ title = "Dialog title", handleClose = () => {}, handleSave = () => {}, open = false, children }) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{children}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
				<Button onclick={handleSave}>Save</Button>
			</DialogActions>
		</Dialog>
	)
}

export default BDialog