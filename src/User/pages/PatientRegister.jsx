import React, { useContext } from 'react'
import FormStepper from '../../Common/components/FormStepper'
import { Container, Box, TextField, Button, Paper, Grid, MenuItem, Select, FormControl, FilledInput, Typography } from '@mui/material'
import { customContext } from '../../Common/components/GlobalContext'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import axios from 'axios'


const PatientRegister = () => {
    // common info
    const context = useContext(customContext)
    const [currentStep, setCurrentStep] = React.useState(0)

    const state = {
        steps:["Basic Information", "Address Information", "Upload Profile Picture"],
        required_steps: [0, 1]
    }

    // here we will pass the completed state indexes after fetching from api
    const module = {
        module:'registrations',
        complted_step_numbers:[]
    }

    // methods to be called while submitting the steps
    const saveBasicInfo = ()=>{
            let data = {...inputData}
            let message = ''
            let alertType = 'error'
            let is_error = true
            
            if(data.firstname === ''){
                message = 'First Name can not be empty'
            }
            else if(data.lastname === ''){
                message = 'Last Name can not be empty'
            }
            else if(data.countryCode === ''){
                message = 'Country code can not be empty'
            }
            else if(data.password !== data.confirmPassword){
                message = 'Password does not match'
            }
            else if(data.password.length < 6){
                message = 'Minimum length of password is 6'
            }
            else{
                is_error = false
                message = "Data saved successfully"
                alertType = 'success'
            }

            
            context.setAlertState({
                open:true,
                message: message,
                alertType: alertType
            })
        
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

    // methods in the array have to be in proper sequence
    const methods = [saveBasicInfo, saveAddress, saveProfilePic]




    // component specific code

    const [countryCode, setCountryCode] = React.useState([])

    const getCountryCode = async ()=>{
        context.setIsLoading(true)
        try{
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries/codes')
            const res_data = await response.data
            console.log(res_data.data);
            setCountryCode(res_data.data)

        }
        catch (err){
            const { response } = err
            console.log(response);
            
        }
        finally{
        context.setIsLoading(false)

        }
    }
    React.useEffect(()=>{
        getCountryCode()
        // eslint-disable-next-line
    }, [])

    const [date, setDate] = React.useState(null)
    const [inputData, setInputData] = React.useState({
        firstname:'',
        lastname:'',
        email:'',
        countryCode:'',
        mobile:'',
        password:'',
        confirmPassword:''
    })

    // const [error, setError] = React.useState({
    //     firstname:{
    //         status:false, errorText:""
    //     },
    //     lastname:{
    //         status:false, errorText:""
    //     },
    //     dob:{
    //         status:false, errorText:""
    //     },
    //     email:{
    //         status:false, errorText:""
    //     },
    //     countryCode:{
    //         status:false, errorText:""
    //     },
    //     mobile:{
    //         status:false, errorText:""
    //     },
    //     password:{
    //         status:false, errorText:""
    //     },
    //     confirmPassword:{
    //         status:false, errorText:""
    //     }

    // })

    const handleInput = (e)=>{
        const input = e.target
        
        if(input.name === 'firstname'){
            setInputData({...inputData, firstname:input.value})
        }
        else if(input.name === 'lastname'){
            setInputData({...inputData, lastname:input.value})
        }
        else if(input.name === 'email'){
            setInputData({...inputData, email:input.value})
        }
        else if(input.name === 'countryCode'){
            setInputData({...inputData, countryCode:input.value})
        }
        else if(input.name === 'mobile'){
            setInputData({...inputData, mobile:input.value})
            
        }
        else if(input.name === 'password'){
            setInputData({...inputData, password:input.value})
        }
        else if(input.name === 'confirmPassword'){
            setInputData({...inputData, confirmPassword:input.value})
        }
    }
    

    const BasicForm = (
            <>
                <Paper component={Box} p={6} autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField fullWidth variant="filled" margin='normal'
                        name='firstname'
                        label="First Name"
                        value={inputData.firstname}
                        onChange={handleInput}
                        required
                        // error={error.firstname.status}
                        // helperText={error.firstname.errorText}
                        />

                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField fullWidth variant="filled" margin='normal'
                        name='lastname'
                        label="Last Name"
                        value={inputData.lastname}
                        onChange={handleInput}
                        required
                      
                        />
                        </Grid>
                    </Grid>
                   
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of Birth"
                            value={date}
                            onChange={(newDate)=>{setDate(newDate)}}
                            renderInput={(params)=><TextField {...params} fullWidth variant="filled" margin='normal' />}
                            required
                        />
                        </LocalizationProvider>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField fullWidth variant="filled" margin='normal'
                        name='email'
                        label="Email" type="email"
                        value={inputData.email}
                        onChange={handleInput}
                        autoComplete="off"
                        required
                        />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Select  input={<FilledInput />} component={TextField} style={{marginTop:15}} fullWidth
                        name='countryCode' onChange={handleInput} required
                        label="Country Code"
                        displayEmpty
                        >
                            <MenuItem disabled component={Typography} > Select Country Code</MenuItem>
                            {countryCode.map(item=>{
                                return(
                                    <MenuItem key={String(item.dial_code) + String(Math.random()).split('.')[1]} value={item.dial_code}>{item.name} ({item.dial_code})</MenuItem>
                                )
                            })}

                        </Select>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField fullWidth variant="filled" margin='normal'
                        name='mobile'
                        type='tel'
                        label="Mobile"
                        value={inputData.mobile}
                        onChange={handleInput}
                        />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField fullWidth variant="filled" margin='normal'
                        name='password'
                        label="Password" type='password'
                        value={inputData.password}
                        onChange={handleInput}
                        autoComplete="off"
                        required
                        />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField fullWidth variant="filled" margin='normal'
                        name='confirmPassword'
                        label="Confirm Password" type='password'
                        value={inputData.confirmPassword}
                        onChange={handleInput}
                        autoComplete="off"
                        required
                        />
                        </Grid>
                    </Grid>
                </Paper>
            </>
        )
    

    const AddressForm = (
            <>
                <Paper component={Box} p={6}>
                    <FormControl>
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
                    </FormControl>
                </Paper>
            </>
        )

    const UploadForm = (
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

    return (
        <> 
            <Container maxWidth="md" component={Box} p={6} mt={0}>
                <FormStepper state={state} setCurrentStep={setCurrentStep} methods={methods} module={module}>
                    {currentStep === 0? BasicForm
                    :
                    (currentStep === 1? AddressForm : UploadForm)
                    }
                </FormStepper>
            </Container>
        </>
    )

    
}

export default PatientRegister











