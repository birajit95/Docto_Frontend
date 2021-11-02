import {Box, AppBar, Typography, Toolbar, Button, IconButton} from '@mui/material';
import React, {useContext, useState} from 'react';
import { makeStyles } from "@mui/styles";
// import { NavLink } from 'react-router-dom';
import LoginDialog from "../../Auth/components/LoginDialog";
import LoggedInMenu from '../../Auth/components/LoggedInMenu';
import { customContext } from './GlobalContext';
import { useHistory } from "react-router";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AppDrawer from './AppDrawer';


const useStyles = makeStyles(theme=>({
    nabButton:{
        width:"20%",
        [theme.breakpoints.down('md')]:{
            width:"40%",
        },
        [theme.breakpoints.down('sm')]:{
            width:"60%",
        },
        [theme.breakpoints.down('sm')]:{
            display:"none"
        }

    }

}))

function NavBar() {
    const classes = useStyles()
    const context = useContext(customContext)

    const history = useHistory()

    const [loginDialogOpen, setLoginDialogOpen] = useState(false)
    const closeDialog = ()=>{
        setLoginDialogOpen(false);
    }

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <>
        <AppBar position="static" component={Box} elevation={20}>
            <Toolbar>
            {context.isLoggedin?(
                <div style={{marginRight:40, marginLeft:40}}>
                    <IconButton color="inherit" onClick={()=>{setIsDrawerOpen(true)}}>
                        {context.openDrawer?<CloseIcon/>:<MenuIcon />}
                    </IconButton>
                </div>)
                : null
                }
                <Typography variant="h4" style={{flexGrow:1, padding:5}}>DocTalk</Typography>
                <div className={classes.nabButton}> 
                    <Button color="inherit" onClick={()=>{history.push('/about')}}>About</Button>
                    <Button color="inherit" onClick={()=>{history.push('/contact')}}>Contact</Button>
                </div>
                {!context.isLoggedin?
                (
                    <div>
                    <Button variant="contained" color="primary" onClick={()=>{setLoginDialogOpen(true)}}>Login</Button>
                    {/* <Button variant="contained" component={Box} style={{marginLeft:6}} color="primary" >Register</Button> */}
                </div>
                )
                :
                (
                <div>
                    <LoggedInMenu />
                </div>
                )
                }
            </Toolbar>
        </AppBar>
        <AppDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        <LoginDialog status={loginDialogOpen} closeDialog={closeDialog}/>
        </>
    )
}

export default NavBar
