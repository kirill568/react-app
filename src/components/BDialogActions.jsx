import DialogActions from '@mui/material/DialogActions'


const BDialogActions= ({children}) => {
    return (
      <DialogActions style={{ justifyContent: "flex-end" }}>
        {children}
      </DialogActions>
    )
  }
  
  export default BDialogActions