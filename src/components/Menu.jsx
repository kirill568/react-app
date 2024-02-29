import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Outlet, Link } from "react-router-dom";

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

export default Menu