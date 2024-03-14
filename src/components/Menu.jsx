import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

const Menu = ({items}) => {
  const menuItems = items.map((item) => {
    return (
      <Link key={item.id} to={item.path}>
        <MenuItem>
          {item.text}
        </MenuItem>
      </Link>
            
    )
  })

  return (
    <MenuList>
      {menuItems}
    </MenuList>
  )
}

Menu.propTypes = {
  items: PropTypes.array
}

export default Menu