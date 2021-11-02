import {Box, Container} from '@mui/material';


const BaseContainerPage = (props) => {
    return (
        <>
         <Container maxWidth="xlg" component={Box} p={6} mt={0} >
            {props.children}
         </Container>
            
        </>
    )
}

export default BaseContainerPage
