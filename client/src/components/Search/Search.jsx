import React, { useContext } from 'react'
import { InputBase, Box, styled, ListItem, List } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux'
import './search.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { getProducts } from '../../redux/actions/productActions';
import { ProductContext } from '../../context/DataProvider';
import axios from 'axios';
const SearchContainer = styled(Box)(({ theme }) => ({
    background: '#fff',
    width: '70.8%',
    margin: 'auto 0',
    marginLeft: '2%',
    display: 'flex',
    height: '32px',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
    [theme.breakpoints.down('md')]: {

    }
}))
const InputSearchBase = styled(InputBase)`
    width:100%;
    font-weight:normal;

`
const SearchIconWrapper = styled(Box)`
    color:black;
    
`
const Search = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const {arr,setArr}=useContext(ProductContext);
    const { products } = useSelector(state => state.getProducts)
    const nav=useNavigate();
    const changeHandler = (e) => {
        setText(e.target.value)
    }
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    const clickHandler = () => {
        setText('')
    }
    const keyHandler=async(e)=>{
        if(e.key==='Enter'){
            console.log("here");
            try{
                const { data } = await axios.post("http://127.0.0.1:5000"+"/queryProcessor",{query:text});
                setText('');
                console.log(data.data);
                setArr(data.data);
                console.log(arr);
                nav('/filter')
            }
            catch(err){
                console.log(err);
            }
        }
    }
    return (
        <SearchContainer >
            <Box style={{ display: 'flex' }}>
                    <InputSearchBase placeholder='Search for Products,brands and more' style={{ marginLeft: '2%' }} value={text} onChange={(e) => { changeHandler(e) }} onKeyPress={(e)=>{keyHandler(e)}}/>
                    <SearchIconWrapper>
                        <SearchIcon style={{ paddingTop: '4.5px' }} />
                    </SearchIconWrapper>

            </Box>
            {
                text &&
                <List style={{ background: 'white', color: 'black', padding: '0' }}>
                    {
                        (products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product =>
                            <ListItem>
                                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'black' }} onClick={clickHandler}>
                                    {product.title.longTitle}
                                </Link>
                            </ListItem>
                        ))
                    }
                </List>
            }
        </SearchContainer >
    )
}

export default Search