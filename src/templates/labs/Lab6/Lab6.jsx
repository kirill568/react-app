import { useState, useEffect, useCallback } from 'react'
import exemplar from '../../../api/api'
import BTable from '../../../components/BTable'
import BTableRow from '../../../components/BTableRow'
import BTableCell from '../../../components/BTableCell'
import Button from '../../../components/Button/Button'
import BIconButton from '../../../components/BIconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CreateNewUserDialog from './CreateNewUserDialog'
import UpdateUserDialog from './UpdateUserDialog'
import useVisibility from '../../../hooks/useVisibility'

const Lab6 = () => {
  const [users, setUsers] = useState([])
  const [isVisibleCreateUserDialog, {show: createUserDialogOpen, hide: createUserDialogHide}] = useVisibility()
  const [isVisibleUpdateUserDialog,  {show: updateUserDialogOpen, hide: updateUserDialogHide}] = useVisibility()
  const [updatableUser, setUpdatableUser] = useState({})

  const headers = [
    { "title": "Name", "key": "name" },
    { "title": "Username", "key": "username" },
    { "title": "Email", "key": "email" },
    { "title": "", "key": "actions" }
  ]

  useEffect(() => {
    exemplar.get("/users")
      .then((response) => {
        setUsers(response.data)
      })
  }, [])

  const onDelete = useCallback((id) => {
    exemplar.delete(`/users/${id}`)
      .then(() => {
        console.log("успешно удален юзер", id, users)
        setUsers(users.filter((user) => user.id !== id))
      })
      .catch((err) => {
        console.error(err)
      })
  }, [users, setUsers])

  const onCreatedSuccessfully = useCallback((id, user) => {
    setUsers([...users, { ...user, id }])

    createUserDialogHide()
  }, [users, setUsers])

  const onUpdatedSuccessfully = useCallback((id, user) => {
    const newUsers = [...users]
    const existUser = newUsers.find((user) => user.id === id)

    existUser.name = user.name
    existUser.username = user.username
    existUser.email = user.email

    setUsers(newUsers)

    updateUserDialogHide()
  }, [users, setUsers])

  return (
    <div className="lab6-template">
      <Button 
        style={{ marginBottom: "10px" }}
        onClick={() => createUserDialogOpen()} 
        label="Create user"
      ></Button>

      <CreateNewUserDialog
        open={isVisibleCreateUserDialog}
        onClose={() => createUserDialogHide()}
        onCreatedSuccessfully={onCreatedSuccessfully}
      ></CreateNewUserDialog>

      {isVisibleUpdateUserDialog &&
        <UpdateUserDialog
          user={updatableUser}
          open={isVisibleUpdateUserDialog}
          onClose={() => updateUserDialogHide()}
          onUpdatedSuccessfully={onUpdatedSuccessfully}
        ></UpdateUserDialog>
      }

      <BTable
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

                  <BIconButton
                    onClick={() => { setUpdatableUser(item); updateUserDialogOpen() }}
                    color="edit"
                    size="small"
                    ariaLabel="delete"
                  >
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
