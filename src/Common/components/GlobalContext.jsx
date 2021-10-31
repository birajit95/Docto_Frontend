import {createContext, useState} from "react";
import Theme1, {Theme2} from "../Basic_Settings/CustomThemeProvider";

export const customContext = createContext();


const GlobalContext = (props)=> {
    

    const [theme, setTheme] = useState(Theme1)

   
    return (
        <>
        <customContext.Provider value={{theme, setTheme}}>
            {props.children}
        </customContext.Provider>
            
        </>
    )
}

export default GlobalContext


