import { Box, Grid, styled } from '@mui/material'
import React from 'react'
const imageURL = [
    'https://rukminim1.flixcart.com/flap/960/960/image/2f30db9425df5cec.jpg?q=50',
    'https://rukminim1.flixcart.com/flap/960/960/image/084789479074d2b2.jpg',
    'https://rukminim1.flixcart.com/flap/960/960/image/1ce0c4c1fb501b45.jpg?q=50'
];
const ImageBox = styled(Grid)`
    margin-top:10px;
    justify-content:space-between;
`
const Image = styled('img')(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('md')]: {
        height: 'auto'
    }
}))
const Midsection = () => {
    return (
        <ImageBox lg={12} sm={12} xs={12} container>
            {
                imageURL.map((url) => (
                    <Grid item lg={3.9} md={4} sm={12} xs={12}>
                        <Image src={url} />
                    </Grid>
                ))
            }
        </ImageBox>
    )
}

export default Midsection