import {createContext, useEffect, useState} from "react";
import Theme1 from "../Basic_Settings/CustomThemeProvider";
import BackDrop from './BackDrop';
import SnackBarAlert from "./SnackBarAlert";



export const customContext = createContext();


const GlobalContext = (props)=> {
    const [theme, setTheme] = useState(Theme1)
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [alertState, setAlertState] = useState({
        open:false,
        message: "",
        alertType: "info"
    })
    
    useEffect(()=>{
        // react-hooks/exhaustive-deps
        const access_token = localStorage.getItem("accessToken")
        access_token ? setIsLoggedin(true) : setIsLoggedin(false)
    }, [localStorage.getItem("accessToken")])
   
    return (
        <>
        <customContext.Provider 
        value={{theme, setTheme, isLoggedin, setIsLoggedin, isLoading, setIsLoading, alertState, setAlertState}}>
            <BackDrop />
            <SnackBarAlert />
            {props.children}
        </customContext.Provider>
            
        </>
    )
}

export default GlobalContext


