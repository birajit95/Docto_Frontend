import {Box, Paper, Typography} from '@mui/material';
import BaseContainerPage from './BaseContainerPage';




import React from 'react'

function Home() {
    return (
        <>
           <BaseContainerPage>
                <Paper component={Box} textAlign="centere" p={10}>
                    <Typography variant="h3">Home Page</Typography>
                    <Typography variant="caption">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus ratione magni provident repudiandae 
                    commodi iste dignissimos fugiat voluptatum esse minus, architecto eum ipsum ab odit, impedit corporis sapiente laudantium rerum!
                    </Typography>
                </Paper>
            </BaseContainerPage>
        </>
    )
}

export default Home;
