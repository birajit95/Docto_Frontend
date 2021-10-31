import NavBar from "./NavBar";
import { ThemeProvider } from '@mui/material/styles';
import React, { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom';
import {customContext} from './GlobalContext'
import CustomRouter from "./CustomRouter";



function Application() {
    const context = useContext(customContext);

    return (
        <>
        <ThemeProvider theme={context.theme}>
            <BrowserRouter>
                <NavBar />
                <CustomRouter />
            </BrowserRouter>
        </ThemeProvider>
        </>
    )
}

export default Application
