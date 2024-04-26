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
import { useGetUsersQuery, useDeleteUserMutation } from '../../../api/users'
import CircularProgress from '@mui/material/CircularProgress'

const Lab6 = () => {
  const [isVisibleCreateUserDialog, { show: createUserDialogOpen, hide: createUserDialogHide }] = useVisibility()
  const [isVisibleUpdateUserDialog, { show: updateUserDialogOpen, hide: updateUserDialogHide }] = useVisibility()
  const [updatableUser, setUpdatableUser] = useState({})

  const headers = [
    { "title": "Name", "key": "name" },
    { "title": "Username", "key": "username" },
    { "title": "Email", "key": "email" },
    { "title": "", "key": "actions" }
  ]

  const {
    isLoadingGetting,
    isFetching,
    isErrorGetting,
    isSuccessGetting,
    data: users,
  } = useGetUsersQuery(
    { refetchOnFocus: true, refetchOnReconnect: true }
  )

  const [deleteUser, { isLoadingDeleting, isErrorDeleting, isSuccessDeleting }] = useDeleteUserMutation();

  const loading = isLoadingGetting || isFetching

  useEffect(() => {
    if (isSuccessDeleting) {
      console.log("успешно удален юзер")
    }

    if (isErrorDeleting) {
      console.error(err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingDeleting])

  const onCreatedSuccessfully = useCallback((id, user) => {
    createUserDialogHide()
  })

  const onUpdatedSuccessfully = useCallback((id, user) => {
    updateUserDialogHide()
  })

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

      {loading ? (
        <CircularProgress style={{ position: "absolute", top: "50%", left: "50%", transform: "translateX(-50%, -50%)"}} />
      ) : users ? (
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
                    onClick={() => deleteUser(item.id)}
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
      ) : null}

    </div>
  )
}

export default Lab6
