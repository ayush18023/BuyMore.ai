import { Box, Button, Typography, styled, Table, TableRow, TableBody, TableCell, AlertTitle, Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { DataContext } from '../../context/DataProvider'
import DisplayItem from './DisplayItem'
import cartempty from '../../assets/cartempty.png'
import { Link, useNavigate } from 'react-router-dom'
import { payUsingPaytm } from '../../service/api'
import { post } from '../../utils/paytm'
import axios from 'axios'
const CartBox = styled(Box)(({ theme }) => ({
    background: 'white',
    boxShadow: '0 1px 1px 0 rgb(0 0 0 / 20%)',
    width: '80%',
    height: 'fit-content',
    marginTop: '50px',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: '0'
    }
}))
const PriceBox = styled(Box)(({ theme }) => ({
    background: 'white',
    marginLeft: '10px',
    boxShadow: '0 1px 1px 0 rgb(0 0 0 / 20%)',
    width: '40%',
    marginTop: '50px',
    height: 'fit-content',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: '0px',
        marginLeft: '0px',
    }
}))
const ListBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 0',
    padding: '0 24px',
}))
const MainCart = styled(Box)(({ theme }) => ({
    padding: '0 150px',
    height: 'calc(100vh - 55px)',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        padding: '0px'
    }
}))
const Notification = styled(Alert)(({ theme }) => ({
    position: 'fixed',
    zIndex: '10',
    width: '20%',
    right: '5px',
    top: '5px',
    [theme.breakpoints.down('md')]: {
        height: '36px',
        width: '199px'
    }
}))
const Cart = () => {
    const { cartItems } = useSelector(state => state.cart)
    const { account,setAccount } = useContext(DataContext)
    const [cart, setCart] = useState(false)
    useEffect(()=>{
        const req=async()=>{
            try{
                const res=await axios.get('http://localhost:8000',{
                    withCredentials:true
                })
                // console.log(res);
                if(res.data.status==='success'){
                    // console.log(res.data.User.firstName);
                    setAccount(res.data.User.firstName);
                }
            }
            catch(err){
                console.log(err);
            }
        }
        req()
    },[])
    let actualPrice = 0;
    let dis = 0;
    let total = 0;
    if (cartItems.length !== 0) {
        for (let item of cartItems) {
            actualPrice += (item.data.price.mrp * item.data.quantity)
            dis += ((item.data.price.mrp * item.data.quantity) - (item.data.price.cost * item.data.quantity))
            total += (item.data.price.cost * item.data.quantity)
        }
    }
    const buyItems = async (total) => {
        if (!account) {
            setCart(true)
            setTimeout(() => { setCart(false) }, 3000)
        }
        else {
            let res = await payUsingPaytm({ amount: total, email: 'jainrishabh0607@gmail.com' })
            console.log(res)
            let information = {
                action: 'https://securegw-stage.paytm.in/order/process',
                params: res
            }
            post(information)
        }
    }
    return (
        <>
            {cart ? <Notification severity="error">
                <AlertTitle>Login to Place Order</AlertTitle>
            </Notification> : <></>}
            {
                cartItems.length !== 0 ?
                    <MainCart>
                        <CartBox>
                            <Box style={{ padding: '24px 16px' }}>
                                <Typography style={{ fontWeight: 'bold' }}>My Cart ({cartItems.length ? cartItems.length : ''})</Typography>
                            </Box>
                            <DisplayItem products={cartItems}></DisplayItem>
                            <Box style={{ padding: '16px 22px', boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'end' }}>
                                <Button variant='contained' style={{ padding: '16px 30px', minWidth: '250px', borderRadius: '0', background: '#fb641b' }} onClick={() => buyItems(total)}>PLACE ORDER</Button>
                            </Box>
                        </CartBox>
                        <PriceBox>
                            <Typography style={{ color: '#878787', borderBottom: '1px solid #f0f0f0', padding: '13px 24px', fontWeight: 'bold' }}>PRICE DETAILS</Typography>
                            <ListBox>
                                <Typography>Price ({cartItems.length} item)</Typography>
                                <Typography>₹{actualPrice}</Typography>
                            </ListBox>
                            <ListBox>
                                <Typography>Discount</Typography>
                                <Typography style={{ color: '#388e3c' }}>-₹{dis}</Typography>
                            </ListBox>
                            <ListBox>
                                <Typography>Delivery Charges</Typography>
                                <Typography style={{ color: '#388e3c' }}>Free</Typography>
                            </ListBox>
                            <Box style={{ padding: '0 24px' }}>
                                <Box style={{ borderTop: '1px dashed #e0e0e0', borderBottom: '1px dashed #e0e0e0', display: 'flex', justifyContent: 'space-between', padding: '20px 0' }}>
                                    <Typography style={{ fontWeight: 'bold' }}>Total Amount</Typography>
                                    <Typography style={{ fontWeight: 'bold' }}>₹{total}</Typography>
                                </Box>
                            </Box>
                            <ListBox style={{ margin: '0 0 0 0', padding: '12px 24px' }}>
                                <Typography style={{ color: '#388e3c', fontWeight: 'bold' }}>You Will Save ₹{dis} on this order</Typography>
                            </ListBox>
                        </PriceBox>
                    </MainCart>
                    :
                    <Box style={{ height: 'calc(100vh - 55px)', display: 'flex' }}>
                        <Box style={{ background: 'white', margin: 'auto auto', width: '80%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={cartempty}></img>
                                <Typography>Missing Cart Items?</Typography>
                                <Link to='/' style={{ textDecoration: 'none' }}>
                                    <Button variant='contained'>See Items</Button>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
            }
        </>
    )
}

export default Cart