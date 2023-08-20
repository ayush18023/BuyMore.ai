import { Typography, styled, Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/actions/cartActions'
const Image = styled('img')(({ theme }) => ({
    width: '125px',
    height: '125px'
}))
const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '24px',
    borderTop: '1px solid #f0f0f0'
}))
const Text = styled(Typography)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '30px'
}))
const ChangeButton = styled(Button)(({ theme }) => ({
    minWidth: '25px',
    height: '25px',
    borderRadius: '50%',
    fontSize: '16px',
    padding: '0',
    background: ' linear-gradient(#fff,#f9f9f9)',
    color: 'black'
}))
const Input = styled('input')(({ theme }) => ({
    width: '28px',
    height: '16px',
    display: 'inline-block',
    padding: '3px 6px',
    borderRadius: '2px',
    backgroundColor: '#fff',
    border: '1px solid #c2c2c2',
    margin: '0 5px',
    textAlign: 'center'
}))
const DisplayItem = ({ products }) => {
    const dispatch = useDispatch()
    const removeItems = (id) => {
        dispatch(removeFromCart(id))
    }
    const increment = (id, quantity) => {
        dispatch(addToCart(id, quantity + 1))
    }
    const decrement = (id, quantity) => {
        dispatch(addToCart(id, quantity - 1))
    }
    return (
        <div>
            {
                products.map(
                    product => (
                        <Container>
                            <Image src={product.data.url} />
                            <Text>
                                <Typography>{product.data.title.longTitle}</Typography>
                                <Box>
                                    <Box component='span' style={{ fontSize: 15 }}>₹{product.data.price.cost * product.data.quantity}</Box>&nbsp;&nbsp;
                                    <Box component='span' style={{ fontSize: 12, color: '#878787' }}><strike>₹{product.data.price?.mrp * product.data.quantity}</strike></Box>&nbsp;&nbsp;
                                    <Box component='span' style={{ fontSize: 12, color: '#388E3C' }}>{product.data.price.discount} off</Box>
                                </Box>
                                <Box style={{ display: 'flex', marginTop: '50px' }}>
                                    <Box>
                                        {product?.data.quantity === 1 ? <ChangeButton variant='contained' disabled>-</ChangeButton> : <ChangeButton variant='contained' onClick={() => decrement(product?.data?.id, product.data.quantity)}>-</ChangeButton>}
                                        <Input value={product?.data.quantity} readOnly></Input>
                                        <ChangeButton variant='contained' onClick={() => increment(product?.data?.id, product?.data.quantity)}>+</ChangeButton>
                                    </Box>
                                    <Button style={{ padding: '0', width: '60px', alignItems: 'left', color: 'black', marginLeft: '30px' }} onClick={() => removeItems(product.data.id)}>Remove</Button>
                                </Box>
                            </Text>
                        </Container>
                    )
                )
            }
        </div >
    )
}

export default DisplayItem