import { Box, Typography } from '@mui/material'
import React from 'react'

const Items = ({ link, text }) => {
    return (
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', margin: '0 auto', height: '100px' }}>
            <img src={link} style={{ height: '80px' }} />
            <Typography style={{ fontSize: '16px', fontWeight: '400' }}>{text}</Typography>
        </Box>
    )
}

export default Items