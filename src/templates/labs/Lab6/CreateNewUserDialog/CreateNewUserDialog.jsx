import { useFormik } from "formik"
import TextField from '@mui/material/TextField';
import BDialog from '../../../../components/BDialog'
import BDialogContent from '../../../../components/BDialogContent'
import BDialogActions from '../../../../components/BDialogActions'
import Button from '../../../../components/Button/Button'
import { BUTTON_COLOR_GREEN, BUTTON_COLOR_GREY } from '../../../../components/Button/config'
import exemplar from "../../../../api/api"
import PropTypes from 'prop-types'

const CreateNewUserDialog = ({ open = false, onClose = () => {}, onCreatedSuccessfully = () => {} }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: ''
    },
    onSubmit: (user, { setSubmitting }) => {
      console.log(JSON.stringify(user, null, 2));
      exemplar.post(`/users`, { user })
        .then((response) => {
          console.log("юзер успешно создан", response)
          onCreatedSuccessfully(response.data.id, user)
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
  })

  return (
    <BDialog
      title="Create new user"
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
            label="Create"
            color={BUTTON_COLOR_GREEN}
            style={{ marginLeft: "15px" }}
          ></Button>
        </BDialogActions>
      </form>
    </BDialog>
  )
}

CreateNewUserDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onCreatedSuccessfully: PropTypes.func
}

export default CreateNewUserDialog