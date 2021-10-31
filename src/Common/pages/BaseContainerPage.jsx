import {Box, Container} from '@mui/material';


const BaseContainerPage = (props) => {
    return (
        <>
         <Container component={Box} p={2} mt={10}>
            {props.children}
         </Container>
            
        </>
    )
}

export default BaseContainerPage
