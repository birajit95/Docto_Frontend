import { Menu, MenuList, MenuItem, Box, Button, Avatar } from "@mui/material";
import React, {useState} from 'react';
import FaceIcon from '@mui/icons-material/Face';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from "react-router";

const LoggedInMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuAncEL, setmenuAncEL] = useState(null)
    const history = useHistory()

    const openMenu = (e)=>{
        setIsOpen(true)
        setmenuAncEL(e.currentTarget)
    }
    const closeMenu = ()=>{
        setIsOpen(false)
    }

    const menu = (
        <Menu anchorEl={menuAncEL} open={isOpen} keepMounted components={Box} onClose={closeMenu} >
        <MenuList autoFocusItem={true}>
            <MenuItem onClick={closeMenu} component={Button} style={{textTransform:"capitalize"}}
            ><FaceIcon style={{marginRight:6}} fontSize="small"/>Profile
            </MenuItem>
            <MenuItem onClick={()=>{
                closeMenu();
                history.push('/logout');
            }} component={Button} style={{textTransform:"capitalize"}}
            ><LogoutIcon style={{marginRight:6}} fontSize="small"/>Logout</MenuItem>
        </MenuList>
    </Menu>
    )

    return (
        <>
         <Avatar
            alt="Remy Sharp"
            src="https://picsum.photos/id/237/200/300"
            sx={{ width: 56, height: 56 }}
            onClick={openMenu}
            className="profile_hover"
            />
        {menu}
        </>
    )
}

export default LoggedInMenu
