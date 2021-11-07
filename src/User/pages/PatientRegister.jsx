import React, { useContext } from 'react'
import FormStepper from '../../Common/components/FormStepper'
import { Container, Box, TextField, Button, Paper, Grid, MenuItem, Select, FormControl, FilledInput, Typography, FormHelperText } from '@mui/material'
import { customContext } from '../../Common/components/GlobalContext'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
// import {Controler, useForm} from 'react-hook-form'
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
        module:'registration',
        complted_step_numbers:[]
    }

    // methods to be called while submitting the steps
    const saveBasicInfo = ()=>{
            const data = handleError(inputData)
            if(data){
                return true
            }
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

    const [error, setError] = React.useState({
        firstname:'',
        lastname:'',
        dob:'',
        email:'',
        countryCode:'',
        mobile:'',
        password:'',
        confirmPassword:''

    })

    const handleError = (data)=>{
        let errorFileds = {}

        if(data.firstname === ''){
            errorFileds['firstname'] = 'Required*'
        }
        if(data.lastname === ''){
            errorFileds['lastname'] = 'Required*'
        }
        if(data.countryCode === ''){
            errorFileds['countryCode'] = 'Required*'
        }
        if(data.password !== data.confirmPassword){
            errorFileds['password'] = 'Password does not match!'
            errorFileds['confirmPassword'] = 'Password does not match!'

        }
        if(data.password.length < 6){
            errorFileds['password'] = 'Password minimum length is 6'
        }

        if(data.mobile === ""){
            errorFileds['mobile'] = 'Required*'
        }

        if(date === null){
            errorFileds['dob'] = 'Required*'

        }
        if(data.email === ''){
            errorFileds['email'] = 'Required*'

        }

        if(Object.keys(errorFileds).length > 0){
            setError({...errorFileds})
            return null
        }
        else{
            let new_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
            const new_data = {...data, dob:new_date}
            return new_data
        }
    }

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
                        error={Boolean(error.firstname)}
                        helperText={error.firstname}
                        onFocus={()=>{setError({...error, firstname:''})}}
                        />

                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField fullWidth variant="filled" margin='normal'
                        name='lastname'
                        label="Last Name"
                        value={inputData.lastname}
                        onChange={handleInput}
                        error={Boolean(error.lastname)}
                        helperText={error.lastname}
                        onFocus={()=>{setError({...error, lastname:''})}}
                        />
                        </Grid>
                    </Grid>
                   
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} role>
                        <DatePicker
                            label="Date of Birth"
                            value={date}
                            onChange={(newDate)=>{setDate(newDate)}}
                            renderInput={
                                (params)=><TextField {...params} 
                                fullWidth variant="filled"
                                margin='normal'
                                error={Boolean(error.dob)}
                                helperText={error.dob}
                        onFocus = {()=>{setError({...error, dob:''})}}

                        onClick = {()=>{setError({...error, dob:''})}}
                                /> 
                            }
                            
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
                        error={Boolean(error.email)}
                        helperText={error.email}
                        onFocus = {()=>{setError({...error, email:''})}}
                        />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Select  input={<FilledInput />} component={TextField} style={{marginTop:15}} fullWidth
                        name='countryCode' onChange={handleInput}
                        label="Country Code"
                        displayEmpty
                        error={Boolean(error.countryCode)}
                        onFocus = {()=>{setError({...error, countryCode:''})}}
                        >
                        <MenuItem disabled component={Typography} > Select Country Code</MenuItem>
                        {countryCode.map(item=>{
                            return(
                                <MenuItem key={String(item.dial_code) + String(Math.random()).split('.')[1]} value={item.dial_code}>{item.name} ({item.dial_code})</MenuItem>
                            )
                        })}

                        </Select>
                        <FormHelperText className='text-danger m-0'>{error.countryCode}</FormHelperText>
                        
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField fullWidth variant="filled" margin='normal'
                        name='mobile'
                        type='tel'
                        label="Mobile"
                        value={inputData.mobile}
                        onChange={handleInput}
                        error={Boolean(error.mobile)}
                        helperText={error.mobile}
                        onFocus={()=>{setError({...error, mobile:''})}}
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
                        error={Boolean(error.password)}
                        helperText={error.password}
                        onFocus = {()=>{setError({...error, password:'', confirmPassword:''})}}
                        />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField fullWidth variant="filled" margin='normal'
                        name='confirmPassword'
                        label="Confirm Password" type='password'
                        value={inputData.confirmPassword}
                        onChange={handleInput}
                        autoComplete="off"
                        error={Boolean(error.confirmPassword)}
                        helperText={error.confirmPassword}
                        onFocus = {()=>{setError({...error, password:'', confirmPassword:''})}}
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











