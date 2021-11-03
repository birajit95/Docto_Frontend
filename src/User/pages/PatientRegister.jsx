import React, { useContext } from 'react'
import FormStepper from '../../Common/components/FormStepper'
import { Container, Box, TextField, Button, Paper, Grid } from '@mui/material'
import { customContext } from '../../Common/components/GlobalContext'


const PatientRegister = () => {
    const context = useContext(customContext)
    const [currentStep, setCurrentStep] = React.useState(0)

    const [state, setState] = React.useState({
        steps:["Basic Information", "Address Information", "Upload Profile Picture"],
        required_steps: [0, 1]
    })
    const [module, setModule] = React.useState({
        module:'registration',
        complted_step_numbers:[]
    })

    const saveBasicInfo = ()=>{
        console.log("Hello Basic");
            context.setAlertState({
                open:true,
                message:"Basic Info Saved",
                alertType: 'info'
            })
        return "Like a doggy"
    }
    const saveAddress = ()=>{
        context.setAlertState({
            open:true,
            message:"Address cant be saved ",
            alertType: 'error'
        })
        console.log("Hello Address");
        return true
    }
    const saveProfilePic= ()=>{
        console.log("Hello File");
        return true
    }
    const methods = [saveBasicInfo, saveAddress, saveProfilePic]


    const BasicForm = ()=>{
        return(
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
        )
    }

    const AddressForm = ()=>{
        return(
            <div>
                <Paper component={Box} p={6}>
                    <Grid container spacing={2}>
                        <Grid item lg={12} >
                        <TextField fullWidth variant="filled" margin='normal'
                        label="Address Line 1"
                        />
                        </Grid>
                        <Grid item lg={12} >
                        <TextField fullWidth variant="filled" margin='normal'
                        label="Addres Line 2"
                        />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item lg={4}>
                        <TextField fullWidth variant="filled" margin='normal'
                        label="City"
                        />
                        </Grid>
                        <Grid item lg={4}>
                        <TextField fullWidth variant="filled" margin='normal'
                        label="State"
                        />
                        </Grid>
                        <Grid item lg={4}>
                        <TextField fullWidth variant="filled" margin='normal'
                        label="Country"
                        />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }

    const UploadForm = ()=>{
        return(
            <>
            <Paper component={Box} p={6}>
                    <Grid container spacing={2}>
                        <Grid item lg={12} >
                        <TextField fullWidth margin='normal'
                        type="file" helperText="[only .jpg and .png supported]"
                        />
                        </Grid>
                        <Grid item lg={12} >
                        <Button fullWidth margin='normal'
                        variant="contained" 
                        >Upload
                        </Button>
                        </Grid>
                    </Grid>
                    
                </Paper>
    
            </>
        )
    }

    return (
        <> 
            <Container maxWidth="md" component={Box} p={6} mt={0}>
                <FormStepper state={state} setCurrentStep={setCurrentStep} methods={methods} module={module}>
                    {currentStep === 0? <BasicForm />
                    :
                    (currentStep === 1?<AddressForm />: <UploadForm />)
                    }
                </FormStepper>
            </Container>
        </>
    )

    
}

export default PatientRegister











