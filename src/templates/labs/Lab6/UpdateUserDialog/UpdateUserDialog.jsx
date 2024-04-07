import { useFormik } from "formik"
import TextField from '@mui/material/TextField';
import BDialog from '../../../../components/BDialog'
import BDialogContent from '../../../../components/BDialogContent'
import BDialogActions from '../../../../components/BDialogActions'
import Button from '../../../../components/Button/Button'
import { BUTTON_COLOR_GREEN, BUTTON_COLOR_GREY } from '../../../../components/Button/config'
import exemplar from "../../../../api/api"
import PropTypes from 'prop-types'

const UpdateUserDialog = ({ user, open = false, onClose = () => { }, onUpdatedSuccessfully = () => { } }) => {
  const formik = useFormik({
    initialValues: {
      name: user.name,
      username: user.username,
      email: user.email
    },
    onSubmit: (updatedUser, { setSubmitting }) => {
      console.log(JSON.stringify(updatedUser, null, 2));
      exemplar.put(`/users/${user.id}`, { updatedUser })
        .then((response) => {
          console.log("юзер успешно обновлен", response)
          onUpdatedSuccessfully(user.id, updatedUser)
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
    enableReinitialze: true
  }, [user])

  return (
    <BDialog
      title="Update user"
      open={open}
      handleClose={onClose}
    >
      <form onSubmit={formik.handleSubmit}>
        <BDialogContent>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            margin="dense"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <TextField
            label="Username"
            name="username"
            variant="outlined"
            margin="dense"
            fullWidth
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <TextField
            label="Email"
            name="email"
            variant="outlined"
            margin="dense"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </BDialogContent>

        <BDialogActions>
          <Button
            type="button"
            onClick={onClose}
            label="Close"
            color={BUTTON_COLOR_GREY}
          ></Button>

          <Button
            type="submit"
            label="Update"
            color={BUTTON_COLOR_GREEN}
            style={{ marginLeft: "15px" }}
          ></Button>
        </BDialogActions>
      </form>
    </BDialog>
  )
}

UpdateUserDialog.propTypes = {
  user: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdatedSuccessfully: PropTypes.func
}

export default UpdateUserDialog