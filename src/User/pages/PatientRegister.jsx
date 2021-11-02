import React from 'react'
import FormStepper from '../../Common/components/FormStepper'
import { Container, Box, TextField, Button, Paper, Grid } from '@mui/material'


const PatientRegister = () => {
    const [state, setState] = React.useState({
        steps:["Basic Information", "Other Information", "Profile Picture Upload"],
        required_steps: [0]
    })

    return (
        <> 
            <Container maxWidth="md" component={Box} p={6} mt={0}>
                <FormStepper state={state}>
                <div>
                    <Paper component={Box} p={6}>
                        <Grid container spacing={2}>
                            <Grid item lg={6} >
                            <TextField fullWidth variant="filled" margin='normal'
                            label="First Name"
                            />
                            </Grid>
                            <Grid item lg={6} >
                            <TextField fullWidth variant="filled" margin='normal'
                            label="Last Name"
                            />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                            <TextField fullWidth variant="filled" margin='normal'
                            label="Date of Birth" type="email"
                            />
                            </Grid>
                            <Grid item lg={6}>
                            <TextField fullWidth variant="filled" margin='normal'
                            label="Email" type="email"
                            />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                            <TextField fullWidth variant="filled" margin='normal'
                            label="Country Code"
                            />
                            </Grid>
                            <Grid item lg={6}>
                            <TextField fullWidth variant="filled" margin='normal'
                            label="Mobile"
                            />
                            </Grid>
                        </Grid>
                        
                        
                    </Paper>
                </div>
                </FormStepper>
            </Container>
        </>
    )
}

export default PatientRegister
