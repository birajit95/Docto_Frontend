import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BaseContainerPage from '../pages/BaseContainerPage';
import { customContext } from './GlobalContext';


export default function FormStepper(props) {

  const {module, complted_step_numbers} = props.module
  
  const state = props.state
  const setCurrentStep = props.setCurrentStep

  const steps = state.steps
  const required_steps = state.required_steps
  
  const [activeStep, setActiveStep] = React.useState(0);

  let cmp_obj = {}

  if(module !== 'registration'){
    complted_step_numbers.map(i=>{
        cmp_obj[i] = true
        // return blank array to avoid warning
        return []
    })
  }
  const [completed, setCompleted] = React.useState(cmp_obj);


  const [isSkip, setIsSkip] = React.useState(false)
  const context = React.useContext(customContext)


  React.useEffect(()=>{
      required_steps.includes(activeStep)?setIsSkip(false):setIsSkip(true)
      setCurrentStep(activeStep)
      // eslint-disable-next-line
  },[activeStep])

  // const lastStep = ()=>{
  //     return totalSteps() - 1;
  // }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? 
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = ()=>{
      if(!isLastStep()){
        setActiveStep(activeStep + 1);
      }
      else{
          console.log("last skip");
      }
  }
  
  const calculteStep = (step)=>{
    const filtered_required_steps = required_steps.filter((i)=>{
        return i < step;
    })

    if (filtered_required_steps.length && filtered_required_steps.length > completedSteps()){
          return true
    }
    else{
        return false
    }
  }

  const handleStep = (step) => () => {
    if(calculteStep(step) && module === 'registration'){
        context.setAlertState({
            open:true,
            message:"Can not skip required step",
            alertType: 'warning'
        })
    }
    else{
        setActiveStep(step); 
    }
  };

  const handleComplete = (e) => { 
    e.preventDefault()   
    let response = props.methods[activeStep]()     //here is the calling of functionalities
    if(response){
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    }
    
  };

  return (
    <BaseContainerPage>
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={String(Math.random()).split('.')[1]} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <form>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
             {props.children}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
             
              {
              module === "registration"?(
                !isSkip?(
                    <Button onClick={handleSkip} sx={{ mr: 1 }} disabled
                    >
                    Skip
                  </Button>
                  ):
                  (
                    <Button onClick={handleSkip} sx={{ mr: 1 }} >
                    skip
                  </Button>
                  )
              ): null

              }
              
              {activeStep !== steps.length &&
                (completed[activeStep] && module === 'registration'? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete} type='submit'>
                    {
                    // completedSteps() === totalSteps() - 1
                    //   ? 'Submit'
                    //   : (module === 'registration'? 'Next':'Update')
                      (module === 'registration'? 'Next':'Update')
                      }
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
      </form>
    </Box>
    </BaseContainerPage>
  );
}
