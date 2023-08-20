import { Typography, Box, Button, styled, Divider } from '@mui/material';
import React from 'react'
import Carousel from "react-multi-carousel";
import Countdown from 'react-countdown'
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from 'react-router-dom';
const Comp = styled(Box)(({ theme }) => ({
    marginTop: '10px',
    background: 'white',
    // [theme.breakpoints.down('md')]: {
    //     height: '370px'
    // }
}))


const Deal = styled(Box)(({ theme }) => ({
    padding: '10px 15px',
    display: 'flex',
}))
const Heading = styled(Typography)(({ theme }) => ({
    margin: 'auto 0',
    fontFamily: 'emoji',
    paddingBottom: '3px',
    fontWeight: 'bold',
    fontSize: '20px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '17px',
        // marginRight: '17px'
    }
}))
const Remaining = styled(Box)(({ theme }) => ({
    display: 'flex',
    margin: 'auto 0',
    marginLeft: '30px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        fontSize: '13.5px',
        marginLeft: '10px'
    }
}))
const ViewButton = styled(Button)(({ theme }) => ({
    marginLeft: 'auto',
    backgroundColor: '#2874f0',
    borderRadius: '2px',
    fontSize: '13px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '11px'
    }
}))


const Image = styled('img')(({ theme }) => ({
    width: 'auto',
    height: '150px',
    [theme.breakpoints.down('md')]: {
        height: '100px'
    }
}))
const Item = styled(Box)`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
const Text = styled(Typography)`
    font-family:emoji;
    font-size:14px;
    margin-top:5px;
`
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const Slide = ({ products, title, heading, state }) => {
    const nav = useNavigate()
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
    const renderer = ({ hours, minutes, seconds }) => {
        return <Box variant='span'>{hours}:{minutes}:{seconds} left</Box>
    }
    const clickHandler = () => {
        nav(`/${title}`)
    }
    let filteredProducts = products.filter((product) => product.category === title.toLowerCase())
    if (state === 1) {
        filteredProducts = products
    }
    return (
        <Comp>
            <Deal>
                <Heading>{heading}</Heading>
                {state === 1 && <Remaining>
                    <img src={timerURL} style={{ margin: 'auto 0', width: '19px' }}></img>
                    <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                </Remaining>}
                {state !== 1 && <ViewButton variant='contained' onClick={clickHandler}>View All</ViewButton>}
            </Deal>
            <Divider />
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                centerMode={true}
                dotListClass='custom-dot-list-style'
                itemClass='carousel-item-padding-40-px'
                containerClass='carousel-container'
            >
                {
                    filteredProducts.map(product => (
                        <Link to={`product/${product.id}`} style={{ textDecoration: 'none' }}>
                            <Item textAlign='center' style={{ padding: '10px 5px' }}>
                                <Image src={product.url}></Image>
                                <Text style={{ fontWeight: '600', color: '#212121' }}>{product.title.shortTitle}</Text>
                                <Text style={{ color: 'green' }}>{product.discount}</Text>
                                <Text style={{ color: '#212121', opacity: '0.6' }}>{product.tagline}</Text>
                            </Item>
                        </Link >
                    ))
                }
            </Carousel>
        </Comp>
    )
}

export default Slide