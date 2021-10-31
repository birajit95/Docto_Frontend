import {Box, AppBar, Typography, Toolbar, Button} from '@mui/material';
import React, {useContext, useState} from 'react';
import { makeStyles } from "@mui/styles";
import { NavLink } from 'react-router-dom';
import LoginDialog from "../../Auth/components/LoginDialog";
import LoggedInMenu from '../../Auth/components/LoggedInMenu';
import { customContext } from './GlobalContext';



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

    const [loginDialogOpen, setLoginDialogOpen] = useState(false)
    const closeDialog = ()=>{
        setLoginDialogOpen(false);
    }

    return (
        <>
        <AppBar position="static" component={Box} elevation={20}>
            <Toolbar>
                <Typography variant="h4" style={{flexGrow:1}}>DocTalk</Typography>
                <div className={classes.nabButton}> 
                    <Button color="inherit" component={NavLink} to="/">Home</Button>
                    <Button color="inherit" component={NavLink} to="/about">About</Button>
                    <Button color="inherit" component={NavLink} to="/contact">Contact</Button>
                </div>
                {!context.isLoggedin?
                (
                    <div>
                    <Button variant="contained" color="primary" onClick={()=>{setLoginDialogOpen(true)}}>Login</Button>
                    <Button variant="contained" component={Box} style={{marginLeft:6}} color="primary" >Register</Button>
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
        <LoginDialog status={loginDialogOpen} closeDialog={closeDialog}/>
        </>
    )
}

export default NavBar
