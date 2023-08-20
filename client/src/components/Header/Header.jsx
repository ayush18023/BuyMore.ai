import React, { useContext } from 'react'
import { AppBar, Toolbar, styled, Box, InputBase, Alert, AlertTitle, IconButton, Drawer, ListItem, List, Button, Typography } from '@mui/material'
import img from '../../assets/logo2.png'
import Search from '../Search/Search'
import CustomButtons from '../CustomButtons/CustomButtons'
import { DataContext } from '../../context/DataProvider'
import { useState } from 'react'
import { useEffect } from 'react'
import Categories from '../Products/Categories'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Login from '../Login/Login';
import Profile from './Profile'
const ShoppingBox = styled(Box)`
    display:flex
`
const StyledHeader = styled(AppBar)`
    height:auto;
    display:flex;
    z-index:9;
    
`
const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '50%',
    [theme.breakpoints.down('md')]: {
        margin: '0 auto',
        width: '70%'
    }
}))

const Hamburger = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'block',
        color: 'white'
    }
}))
const Image = styled('img')(({ theme }) => ({
    height: '45px',
    [theme.breakpoints.down('md')]: {
        height: '35px'
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
function Header() {
    const { account, setAccount } = useContext(DataContext)
    const [ok, setOk] = useState(false)
    const [open, setOpen] = useState(false)
    const [toggleLogin, setLogin] = useState(false)
    const [cart, setCart] = useState(false)
    const navigate = useNavigate()
    useEffect(() => { setTimeout(() => { if (account) { setOk(true); setTimeout(() => { setOk(false) }, 4000) } }) }, [account])

    const clickHandler = () => {
        if (!account) {
            setCart(true)
            setTimeout(() => { setCart(false) }, 3000)
            setOpen(false)
        }
        else {
            navigate('/cart')
            setOpen(false)
        }
    }
    const openHandler = () => {
        setOpen(true)
        setLogin(false)
    }
    const closeHandler = () => {
        setOpen(false)
        // setLogin(true)
    }
    const openDialog = () => {
        // console.log(toggleLogin)
        if (!toggleLogin) {
            setLogin(true)
            setOpen(false)
        }
    }

    return (
        <div className='header'>
            {ok ? <Notification severity="success">
                <AlertTitle>Success</AlertTitle>
                User signedin successfully
            </Notification> : <></>}
            {cart ? <Notification severity="error">
                <AlertTitle>Login to access cart</AlertTitle>
            </Notification> : <></>}
            <StyledHeader>
                <Toolbar style={{ display: 'flex', justifyContent: 'center', minHeight: '55px' }}>
                    <Hamburger onClick={() => openHandler()}>
                        <MenuIcon></MenuIcon>
                    </Hamburger>
                    <Drawer open={open} onClose={() => closeHandler()}>
                        {/* hello */}
                        <Box style={{ width: 200 }}>
                            <List>
                                <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    {account ? <Profile account={account} setAccount={setAccount} /> : <Button varient='contained' style={{ color: "#1976d2", background: 'white', padding: '0', textAlign: 'left' }} onClick={() => openDialog()}><p style={{ margin: 0, width: '100%' }}>Login</p></Button>}
                                    <Typography style={{ marginTop: '5px' }}>Become a Seller</Typography>
                                    <ShoppingBox style={{ marginTop: '5px', cursor: 'pointer' }} onClick={() => clickHandler()}>
                                        <ShoppingCartIcon />
                                        <Typography>Cart</Typography>
                                    </ShoppingBox>
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                    <Login open={toggleLogin} setOpen={setLogin} />
                    <Component>
                        <Box>
                            <Link to='/'>
                                <Image src={img} />
                            </Link>
                        </Box>
                        <Search />
                    </Component>
                    <CustomButtons style={{ width: '50%' }} />
                    <Categories></Categories>
                </Toolbar>
            </StyledHeader>
        </div>
    )
}

export default Header