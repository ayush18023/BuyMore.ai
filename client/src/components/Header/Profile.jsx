import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useState } from 'react'
import Cookies from 'js-cookie';
const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false)
    const clickHandler = (event) => {
        setOpen(event.currentTarget)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const logout = () => {
        // document.cookie = 'yourCookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        Cookies.remove('jwt');
        setAccount('')
    }
    return (
        <>
            <Button varient='contained' style={{ color: "#1976d2", background: 'white', marginTop: 'auto', marginBottom: 'auto', padding: '2px 40px', borderRadius: '0' }} onClick={(e) => { clickHandler(e) }}>{account}</Button>
            <Menu
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={() => { handleClose(); logout(); }} style={{ padding: '0 10px' }}>
                    <PowerSettingsNewIcon style={{ fontSize: '1.2rem', marginRight: '5px' }}></PowerSettingsNewIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default Profile