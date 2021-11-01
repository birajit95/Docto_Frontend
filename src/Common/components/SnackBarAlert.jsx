import { Snackbar, Alert } from '@mui/material';
import { customContext } from './GlobalContext';
import { useContext } from 'react';



const SnackBarAlert = () => {
    const context = useContext(customContext)
    const handleClose = ()=>{
        context.setAlertState({
            open:false,
            message:"",
            alertType: "info"
        })
    }
    return (
        <>
        <Snackbar open={context.alertState.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
            <Alert onClose={handleClose} severity={context.alertState.alertType} sx={{ width: '100%' }}>
            {context.alertState.message}
            </Alert>
        </Snackbar>
        </>
    )
}

export default SnackBarAlert
