import { Box, styled } from '@mui/material'
import React from 'react'
import Items from '../Items/Items'
const navData = [
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100', text: 'Top Offers' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100', text: 'Grocery' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100', text: 'Mobile' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100', text: 'Fashion' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100', text: 'Electronics' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/ee162bad964c46ae.png?q=100', text: 'Home' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100', text: 'Appliances' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100', text: 'Travel' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100', text: 'Beauty, Toys & More' }
];
const Productsbox = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    margin: '1% 5%',
    [theme.breakpoints.down('md')]: {
        display: 'none'

    }
}))
const Products = () => {
    return (
        <div style={{ display: 'flex', boxShadow: '0 1px 1px 0 rgb(0 0 0 / 16%)' }}>
            <Productsbox>
                {navData.map((item) => (<Items key={item.text} link={item.url} text={item.text} />))}
            </Productsbox>
        </div>
    )
}

export default Products