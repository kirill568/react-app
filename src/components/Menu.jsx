import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'

const Menu = ({ items, onClose, open = false }) => {
  const navigate = useNavigate()

  return (
    <Drawer open={open} onClose={onClose}>
      <Box sx={{ width: 250 }} role="presentation">
        <MenuList>
          {
            items.map((item) => {
              return (
                <MenuItem key={item.id} onClick={() => { onClose(); navigate(item.path) }}>
                  {item.text}
                </MenuItem>
              )
            })
          }
        </MenuList>
      </Box>
    </Drawer >
  )
}

Menu.propTypes = {
  items: PropTypes.array,
  onClose: PropTypes.func,
  open: PropTypes.bool
}

export default Menu