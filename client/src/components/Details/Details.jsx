
import { Box, Button, Typography, styled, Grid } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../redux/actions/productActions'
import ActionItem from './ActionItem'
import ProductDetail from './ProductDetail'
import DataProvider, { DataContext, ProductContext } from '../../context/DataProvider'
import axios from 'axios'
const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
const Container = styled(Grid)(({ theme }) => ({
    background: 'white',
    display: 'flex',
    height: '685px',
    [theme.breakpoints.down('md')]: {
        margin: '0',
        height: '100%'
    }
}))
const Right = styled(Grid)`
    margin-top:50px;
    padding:0 0 0 15px;
`
const DetailBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        // overflow: 'hidden',
        background: '#f2f2f2'
    }
}))
const Details = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const {arr}=useContext(ProductContext);
    let product;
    console.log(arr);
    for(let pro of arr){
        if(pro.id==id){
            console.log(pro);
            product=pro;
            break;
        }
    }
    const {setAccount}=useContext(DataContext);
    // useEffect(()=>{
    //     const req=async()=>{
    //         try{
    //             const res=await axios.get('http://localhost:8000',{
    //                 withCredentials:true
    //             })
    //             // console.log(res);
    //             if(res.data.status==='success'){
    //                 // console.log(res.data.User.firstName);
    //                 setAccount(res.data.User.firstName);
    //             }
    //         }
    //         catch(err){
    //             console.log(err);
    //         }
    //     }
    //     req()
    // },[])
    return (
        <DetailBox>
            <Container container>
                <Grid item lg={4} md={4} sm={8} xs={12}>
                    <ActionItem product={product} />
                </Grid>
                <Right item lg={8} md={8} sm={8} xs={12}>
                    <Typography>{product?.productDisplayName}</Typography>
                    <Box style={{ display: 'flex' }}>
                        <Box style={{ backgroundColor: '#388E3C', marginTop: 3, padding: '2px 4px 2px 6px', color: 'white', fontSize: 12, borderRadius: '3px' }}>
                            {product?.myntraRating}★
                        </Box>
                        <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14, marginLeft: '5px' }}>
                            {400} Reviews
                        </Typography>
                    </Box>
                    <Typography>
                        <Box component='span' style={{ fontSize: 28 }}>₹{product?.price}</Box>&nbsp;&nbsp;&nbsp;
                        <Box component='span' style={{ color: '#878787' }}><strike>₹{product?.discountedPrice}</strike></Box>&nbsp;&nbsp;&nbsp;
                        <Box component='span' style={{ color: '#388E3C' }}>₹{product?.price-product?.discountedPrice} off</Box>
                    </Typography>
                    <ProductDetail product={product} />
                </Right>
            </Container>
        </DetailBox>
    )
}

export default Details