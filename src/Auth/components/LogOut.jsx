import { useContext } from "react";
import { useHistory } from "react-router";
import { customContext } from "../../Common/components/GlobalContext";



const Logout = ()=>{
    const history = useHistory()
    const context = useContext(customContext)
    localStorage.clear()
    context.setIsLoggedin(false)
    history.push('/')
    return (
        <>
        </>
    );
}

export default Logout;