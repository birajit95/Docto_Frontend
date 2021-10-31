import {Box, AppBar, Typography, Toolbar, Button, Container} from '@mui/material';
import React from 'react';
import { makeStyles } from "@mui/styles";
import { display, fontWeight } from '@mui/system';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles(theme=>({
    nabButton:{
        width:"50%",
        paddingRight: "30%",
        display: "flex",
        justifyContent: "space-evenly",
        
    }

}))

function NavBar() {
    const classes = useStyles()
    return (
        <>
        <AppBar position="static" component={Box} elevation={20}>
            <Toolbar>
                <Typography variant="h4" style={{flexGrow:1}}>Doctalk</Typography>
                <div className={classes.nabButton}> 
                    <Button color="inherit" component={NavLink} to="/">Home</Button>
                    <Button color="inherit" component={NavLink} to="/about">About</Button>
                    <Button color="inherit" component={NavLink} to="/contact">Contact</Button>
                </div>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default NavBar
