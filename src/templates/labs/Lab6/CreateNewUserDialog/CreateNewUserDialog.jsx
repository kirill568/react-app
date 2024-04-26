import { useEffect } from 'react'
import { useFormik } from "formik"
import TextField from '@mui/material/TextField';
import BDialog from '../../../../components/BDialog'
import BDialogContent from '../../../../components/BDialogContent'
import BDialogActions from '../../../../components/BDialogActions'
import Button from '../../../../components/Button/Button'
import { BUTTON_COLOR_GREEN, BUTTON_COLOR_GREY } from '../../../../components/Button/config'
import PropTypes from 'prop-types'
import { useCreateUserMutation } from "../../../../api/users"

const CreateNewUserDialog = ({ open = false, onClose = () => { }, onCreatedSuccessfully = () => { } }) => {
  const [createUser, { isLoading, isError, error, isSuccess, data: createdUser }] = useCreateUserMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: ''
    },
    onSubmit: (user, { setSubmitting }) => {
      createUser(user)
      setSubmitting(false)
    },
  })

  useEffect(() => {
    if (isSuccess) {
      console.log("юзер успешно создан", createdUser)
      onCreatedSuccessfully(createdUser.id, createdUser)
    }

    if (isError) {
      console.error(err)
    }
  }, [isLoading])

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