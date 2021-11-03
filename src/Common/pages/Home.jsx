import {Container, Box, Paper, Typography, Card, CardActions, CardContent, CardMedia, Button, Grid} from '@mui/material';
import { useHistory } from 'react-router';
import React from 'react'


function Home() {
    const history = useHistory()

    const cardData = [
        {
            heading:"Are You A Doctor?", img:"https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg",
            target:'/'

        },
        {
            heading:"Need A Dcotor?", img:"https://www.hupport.com/wp-content/uploads/2020/08/medical_scheduling_2x-BLOG.png",
            target:'/patient-register'

        }
    ]

    return (
        <>
           <Container maxWidth="md" component={Box} p={10} mt={10} >
                <Paper component={Box} p={10} style={{backgroundColor:"rgba(235, 233, 233, 0.6)"}} elevation={20}
                className="text-center">
                <Grid container spacing={4}>
                    {
                        cardData.map((item)=>{
                            return(
                                <Grid item lg={6} md={6} sm={6}>
                                <Card sx={{ maxWidth: 345 }} className="home-image">
                                <CardMedia style={{objectFit:"contain"}}
                                    component="img"
                                    height="200"
                                    image={item.img}
                                    alt="image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {item.heading}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="outlined" fullWidth onClick={()=>{history.push(item.target)}}>SignUp Here</Button>
                                </CardActions>
                                </Card>
                            </Grid>
                            )
                        })
                    }
                     </Grid>     
                </Paper>
            </Container>
        </>
    )
}

export default Home;
