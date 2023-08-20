import React from 'react'
import { Box, Button, Typography, styled, Alert, AlertTitle } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Login from '../Login/Login';
import { useState } from 'react';
import { useContext } from 'react';
import { DataContext, LoginContext } from '../../context/DataProvider';
import { useEffect } from 'react';
import Profile from '../Header/Profile';
import { useNavigate } from 'react-router-dom';
const HeaderBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '32%',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }

}))
const ShoppingBox = styled(Box)`
    display:flex
`
const Notification = styled(Alert)(({ theme }) => ({
    position: 'fixed',
    zIndex: '10',
    width: '20%',
    right: '5px',
    top: '5px'
}))
const CustomButtons = () => {
    const [toggleLogin, setLogin] = useState(false)
    const [cart, setCart] = useState(false)
    const { account, setAccount } = useContext(DataContext)
    const navigate = useNavigate()
    const openDialog = () => {
        if (!toggleLogin) {

            setLogin(true)
        }
    }
    const clickHandler = () => {
        // if (!account) {

        //     setCart(true)
        //     setTimeout(() => { setCart(false) }, 3000)
        // }
        navigate('/cart')
    }
    return (
        <HeaderBox>
            {account ? <Profile account={account} setAccount={setAccount} /> : <Button varient='contained' style={{ color: "#1976d2", background: 'white', marginTop: 'auto', marginBottom: 'auto', padding: '2px 40px', borderRadius: '0' }} onClick={() => openDialog()}>Login</Button>}
            {/* {cart ? <Notification severity="error">
                <AlertTitle>Login to access cart</AlertTitle>
            </Notification> : <></>} */}
            <Typography style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: '7%' }}>Become a Seller</Typography>
            <ShoppingBox style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: '7%', cursor: 'pointer' }} onClick={() => clickHandler()}>
                <ShoppingCartIcon />
                <Typography>Cart</Typography>
            </ShoppingBox>
            <Login open={toggleLogin} setOpen={setLogin} />
        </HeaderBox>

    )
}

export default CustomButtons