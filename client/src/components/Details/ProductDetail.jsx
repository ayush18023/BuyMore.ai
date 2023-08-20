import { Typography, Box, styled, Table, TableBody, TableRow, TableCell } from '@mui/material'
import React from 'react'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
const SmallText = styled(Box)`
    vertical-align:baseline;
    &>p{
        font-size:14px;
        margin-top:15px;
    }
`
const StyledBadge = styled(LocalOfferIcon)`
    margin-right:10px;
    color:#00cc00;
    font-size:15px;
`
const ColumnText = styled(TableRow)`
    font-size:14px;
    vertical-align:baseline;
    &>td{
        font-size:14px;
        margin-top:10px;
        border:none;
    }
`
const ProductDetail = ({ product }) => {
    const date = new Date(new Date().getTime() + 3 * 14 * 60 * 60 * 1000)
    return (
        <>
            <SmallText>
                <Typography>Available offers</Typography>
                <Box>
                    <Typography style={{ marginTop: '10px' }}><StyledBadge />10% off on Citi Credit Card and EMI Transactions, up to ₹1,500. On orders of ₹5,000 and above</Typography>
                    <Typography style={{ marginTop: '10px' }}><StyledBadge />10% off on ICICI Bank Credit Card Transactions, up to ₹1250. On orders of ₹5000 and above</Typography>
                    <Typography style={{ marginTop: '10px' }}><StyledBadge />10% off on ICICI Bank Credit Card EMI Transactions, up to ₹1250. On orders of ₹5000 and above</Typography>
                </Box>
            </SmallText>
            <Table style={{ marginTop: '10px' }}>
                <TableBody>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                        <TableCell style={{ fontWeight: '600' }}>Delivery by: {date.toDateString()}</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
                        <TableCell style={{}}>No Warranty</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Seller</TableCell>
                        <TableCell>
                            <Box component="span" style={{ color: '#2874f0' }}>SuperComNet</Box>
                            <Box>GST invoice available</Box>
                        </TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Description</TableCell>
                        <TableCell style={{}}>{product?.description}</TableCell>
                    </ColumnText>
                </TableBody>
            </Table>
        </>
    )
}

export default ProductDetail