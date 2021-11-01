import React, {useContext} from 'react'
import { Backdrop, Button, CircularProgress} from '@mui/material';
import { customContext } from './GlobalContext';

const BackDrop = () => {
    const context = useContext(customContext);
    return (
        <>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={context.isLoading}
        // onClick={handleClose}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
        </>
    )
}

export default BackDrop
