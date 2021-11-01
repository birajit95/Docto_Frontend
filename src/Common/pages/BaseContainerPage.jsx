import {Box, Container} from '@mui/material';


const BaseContainerPage = (props) => {
    return (
        <>
         <Container maxWidth="xl" component={Box} p={2} mt={1}>
            {props.children}
         </Container>
            
        </>
    )
}

export default BaseContainerPage
