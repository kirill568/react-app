import { useState, useEffect, useCallback } from 'react'
import exemplar from './basic'
import BTable from '../../../components/BTable'
import BTableRow from '../../../components/BTableRow'
import BTableCell from '../../../components/BTableCell'
import Button from '../../../components/Button/Button'
import BIconButton from '../../../components/BIconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CreateNewUserDialog from './CreateNewUserDialog'
import UpdateUserDialog from './UpdateUserDialog'


const Lab6 = () => {
  const [users, setUsers] = useState([])
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false)
  const [updateUserDialogOpen, setUpdateUserDialogOpen] = useState(false)
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

    setCreateUserDialogOpen(false)
  }, [users, setUsers])

  const onUpdatedSuccessfully = useCallback((id, user) => {
    const newUsers = [...users]
    const existUser = newUsers.find((user) => user.id === id)

    existUser.name = user.name
    existUser.username = user.username
    existUser.email = user.email

    setUsers(newUsers)

    setUpdateUserDialogOpen(false)
  }, [users, setUsers])

  return (
    <div className="lab6-template">
      <Button 
        style={{ marginBottom: "10px" }}
        onClick={() => setCreateUserDialogOpen(true)} 
        label="Create user"
      ></Button>

      <CreateNewUserDialog
        open={createUserDialogOpen}
        onClose={() => setCreateUserDialogOpen(false)}
        onCreatedSuccessfully={onCreatedSuccessfully}
      ></CreateNewUserDialog>

      {updateUserDialogOpen &&
        <UpdateUserDialog
          user={updatableUser}
          open={updateUserDialogOpen}
          onClose={() => setUpdateUserDialogOpen(false)}
          onUpdatedSuccessfully={onUpdatedSuccessfully}
        ></UpdateUserDialog>
      }

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

                  <BIconButton
                    onClick={() => { setUpdatableUser(item); setUpdateUserDialogOpen(true) }}
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