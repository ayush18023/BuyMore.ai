import { Box, styled } from '@mui/material'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/actions/productActions'
import Products from '../Products/Products'
import Banner from './Banner'
import Midsection from './Midsection'
import Slide from './Slide'
import DataProvider, { DataContext } from '../../context/DataProvider'
import axios from 'axios'
const Leftcomponent = styled(Box)(({ theme }) => ({
    width: '85%',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}))
const Rightcomponent = styled(Box)(({ theme }) => ({
    width: '204.012px',
    background: 'white',
    height: '283.55px',
    margin: '10px 0 0 10px',
    padding: '10px',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}))
const Home = () => {
    const {setAccount}=useContext(DataContext);
    const { products } = useSelector(state => state.getProducts)
    const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';
    const dispatch = useDispatch()
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
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <Fragment>
            <Products />
            <div style={{ margin: '0.5% 0.5% 0 0.5%', background: '#F2F2F2' }}>
                <Banner />
                <Box style={{ display: 'flex', width: '100%' }}>
                    <Leftcomponent>
                        <Slide products={products} title='Deal of the Day' heading='Deal of the Day' state={1} />
                    </Leftcomponent>
                    <Rightcomponent>
                        <img src={adURL} style={{ width: '100%', height: '100%' }}></img>
                    </Rightcomponent>
                </Box>
                <Midsection />
                <Slide products={products} title='Electronics' heading='Electronics' />
                <Slide products={products} title='Kitchen' heading='Kitchen' />
                <Slide products={products} title='Mobiles' heading='Mobiles' />
                <Slide products={products} title='Sports' heading='Sports and Fitness' />
                <Slide products={products} title="Laptops" heading='Laptops' />
                <Slide products={products} title="Furniture" heading='Furniture' />
            </div>
        </Fragment>
    )
}

export default Home