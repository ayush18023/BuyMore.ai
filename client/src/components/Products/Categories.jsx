import { Button, Menu, MenuItem, Box, styled } from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './categories.css'

const Category = styled(Button)(({ theme }) => ({
    background: '#1976d2',
    color: 'white',
    display: 'none',
    fontFamily: 'system-ui',
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'flex',
        borderRadius: '0',
        height: '30px',
        width: '95px',
        fontSize: '14px',
        fontWeight: 'bold',
        justifyContent: 'flex-end'
    },
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        position: 'relative',
        left: '0px',
        width: '100px',
        fontSize: '13px',
        padding: 0,
        justifyContent: 'flex-end'
    }
}))
const Categories = () => {
    const [open, setOpen] = useState(false)
    const clickHandler = (event) => {
        setOpen(event.currentTarget)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Category variant="contained" onClick={(e) => { clickHandler(e) }} className='button'>
                <Box style={{ display: 'flex' }}>
                    <ExpandMoreIcon />
                    <p style={{ margin: 0, padding: 0, margin: 'auto 0' }}>More</p>
                </Box>
            </Category>
            <Menu
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { handleClose() }}>Top Offers</MenuItem>
                <MenuItem onClick={() => { handleClose() }}>Grocery</MenuItem>
                <MenuItem onClick={() => { handleClose() }}>Mobile</MenuItem>
                <MenuItem onClick={() => { handleClose() }}>Fashion</MenuItem>
                <MenuItem onClick={() => { handleClose() }}>Electronics</MenuItem>
                <MenuItem onClick={() => { handleClose() }}>Home</MenuItem>
                <MenuItem onClick={() => { handleClose() }}>Appliances</MenuItem>
                <MenuItem onClick={() => { handleClose() }}>Travel</MenuItem>
                <MenuItem onClick={() => { handleClose() }}>Beauty, Toys & More</MenuItem>
            </Menu>
        </>
    )
}

export default Categories