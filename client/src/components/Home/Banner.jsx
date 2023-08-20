import React from 'react'
import Carousel from "react-multi-carousel";
import { styled } from '@mui/material'
import "react-multi-carousel/lib/styles.css";
import './carousel.css'
const Image = styled('img')(({ theme }) => ({
    width: '100vw',
    height: '270px',
    [theme.breakpoints.down('md')]: {
        objectFit: 'cover',
        height: '150px'
    },
    // [theme.breakpoints.down('sm')]: {
    //     objectFit: 'contain',
    //     height: '100%'
    // }
}))
const bannerData = [
    { id: 1, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/d117a62eb5fbb8e1.jpg?q=50' },
    { id: 2, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50' },
    { id: 3, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50' },
    { id: 4, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50' }
]
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const Banner = () => {
    return (
        <div>
            <Carousel responsive={responsive} style={{ listStyle: 'none' }} swipeable={false}
                draggable={false} infinite={true} autoPlay={true} autoPlaySpeed={4000}>
                {bannerData.map((item) => (<Image key={item.id} src={item.url} />))}
            </Carousel>
        </div>
    )
}

export default Banner