import { useState, useEffect, useCallback } from 'react'
import exemplar from './basic'
import BTable from '../../../components/BTable'
import BTableRow from '../../../components/BTableRow'
import BTableCell from '../../../components/BTableCell'
import Button from '../../../components/Button/Button'
import BIconButton from '../../../components/BIconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import BDialog from '../../../components/BDialog'

const Lab6 = () => {
  const [users, setUsers] = useState([])
  const [createUserDialogOpen, setCreateUserDialogOpen] = useSatate(false)

  const headers = [
    { "title": "Name", "key": "name" },
    { "title": "Username", "key": "username" },
    { "title": "Email", "key": "email" },
    { "title": "", "key": "actions" }
  ]

  const onDelete = useCallback((id) => {
    exemplar.delete(`/users/${id}`)
      .then(() => {
        console.log("успешно удален юзер", id)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    exemplar.get("/users")
      .then((response) => {
        setUsers(response.data)
      })
  }, [])

  const onCreateUser = () => {
    setCreateUserDialogOpen(true)
  }

  const onCloseCreateUserDialog = () => {
    setCreateUserDialogOpen(false)
  }

  return (
    <div className="lab6-template">
      <Button onClick={onCreateUser} label="Create user"></Button>

      <BDialog
        title="Create new user"
        open={createUserDialogOpen}
        handleClose={onCloseCreateUserDialog}
      >
        <Formik
          initialValues={{
            name: "",
            username: "",
            email: ""
          }}
          onSubmit={handleSubmit}
        >
          <Form className="lab6-user-dialog">
            <div className="form-group">
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="name"
              />
            </div>
            <div className="form-group">
              <Field
                type="text"
                name="username"
                className="form-control"
                placeholder="username"
              />
            </div>
            <div className="form-group">
              <Field
                type="text"
                name="email"
                className="form-control"
                placeholder="email"
              />
              <label htmlFor="rememberMe2">Remember me</label>
            </div>
            <div className="form-group buttons">
              <button type="button" onClick={resetForm}>Clear</button>
              <button type="reset">Clear2</button>
              <button type="submit">Submit</button>
            </div>
          </Form>
        </Formik>
      </BDialog>

      <BTable
        items={users}
        headers={headers}
      >
        {
          users.map((item) => {
            return (
              <BTableRow key={item.id}>
                <BTableCell>{item.name}</BTableCell>
                <BTableCell>{item.username}</BTableCell>
                <BTableCell>{item.email}</BTableCell>
                <BTableCell>
                  <BIconButton
                    onClick={() => onDelete(item.id)}
                    color="primary"
                    size="small"
                    ariaLabel="delete"
                  >
                    <DeleteIcon></DeleteIcon>
                  </BIconButton>

                  <BIconButton color="edit" size="small" ariaLabel="delete">
                    <EditIcon></EditIcon>
                  </BIconButton>
                </BTableCell>
              </BTableRow>
            )
          })
        }
      </BTable>


    </div>
  )
}

export default Lab6