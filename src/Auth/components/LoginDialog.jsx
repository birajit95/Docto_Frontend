import { Dialog, DialogTitle, DialogContent, Typography, TextField, Button, Box } from "@mui/material";
import React, {useContext, useState} from 'react';
import { customContext } from "../../Common/components/GlobalContext";
import { urlConfig } from "../../Common/Basic_Settings/urls";
import axios from 'axios';
// import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
// import BackDrop from "../../Common/components/BackDrop";


// const useStyles = makeStyles(theme=>({
//     errorClass:{
//         display: 'none!important'
//     }
// }))


const LoginDialog = (props) => {
    const context = useContext(customContext)
    const history = useHistory()
    // const classes = useStyles()
    const openStatus = props.status
    const closeDialog = props.closeDialog
    

    const [data, setData] = useState({
        username:"",
        password:""
    })

    const handleChange = (e)=>{
        e.target.name === "username"? 
        setData({...data, username:e.target.value})
        :
        setData({...data, password:e.target.value});
                
    }

    const handleSubmit = async (e)=>{
       context.setIsLoading(true)

       e.preventDefault()
    
    try{
        const response = await axios.post(urlConfig.login, data)
        const res_data = await response.data
        localStorage.setItem('accessToken', res_data.access_token)
        localStorage.setItem('refreshToken', res_data.refresh_token)
        localStorage.setItem('name', res_data.name)
        localStorage.setItem('isSuperUser', res_data.is_superuser)
        setData({
            username:"",
            password:""
        })
        context.setIsLoggedin(true)
        history.push('/dashboard')
        closeDialog()
    }
    catch (err){
        const { response } = err;
        if(response === undefined || response.status >= 500){
            context.setAlertState({
                open:true,
                message:"Internal Server Error!",
                alertType: "error"
            })
        }
       else{
        context.setAlertState({
            open:true,
            message: response.data.message,
            alertType: "error"
        })
       }
      
    }
    finally{
        context.setIsLoading(false)
    }
    

    }

    return (
        <>
        <Box>
        {/* <BackDrop /> */}
        <Dialog open={openStatus} onClose={closeDialog}>
            <DialogTitle>
                <div className="text-center">
                    <Typography variant="h5" style={{fontWeight:800, textTransform:"uppercase"}}>
                        Please Login
                    </Typography>
                </div>
            </DialogTitle>
            <DialogContent>
           
               <form onSubmit={handleSubmit}>
               <TextField
                required={true}
                fullWidth
                margin="normal"
                type="text"
                variant="filled"
                label="Username"
                placeholder="Please enter your username"
                name="username"
                value = {data.username}
                onChange={handleChange}
                />
                <TextField
                required={true}
                fullWidth
                margin="normal"
                type="password"
                variant="filled"
                label="Password"
                placeholder="Please enter your password"
                name="password"
                value = {data.password}
                onChange={handleChange}
                />
                <Button
                size="large"
                fullWidth
                variant="contained"
                type="submit"
                > Login
                </Button>
               </form>
            </DialogContent>
        </Dialog>  
        </Box>
        </>
    )
}

export default LoginDialog
