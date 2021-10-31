import {createContext, useEffect, useState} from "react";
import Theme1 from "../Basic_Settings/CustomThemeProvider";

export const customContext = createContext();


const GlobalContext = (props)=> {
    const [theme, setTheme] = useState(Theme1)
    const [isLoggedin, setIsLoggedin] = useState(false)
    
    useEffect(()=>{
        // react-hooks/exhaustive-deps
        const access_token = localStorage.getItem("accessToken")
        access_token ? setIsLoggedin(true) : setIsLoggedin(false)
    }, [localStorage.getItem("accessToken")])
   
    return (
        <>
        <customContext.Provider value={{theme, setTheme, isLoggedin, setIsLoggedin}}>
            {props.children}
        </customContext.Provider>
            
        </>
    )
}

export default GlobalContext


