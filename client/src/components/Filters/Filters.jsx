import { CheckBox } from '@mui/icons-material'
import { Checkbox, FormControlLabel, FormGroup, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RangeSlider from './RangeSlider'
import BasicTabs from './Tabs'
import axios from 'axios'
import { DataContext, ProductContext } from '../../context/DataProvider'

const Filters = () => {
    const [values, setValues] = useState([500, 30000])
    const [rate, setRate] = useState([])
    const { account,setAccount } = useContext(DataContext)
    let {arr:products}=useContext(ProductContext);
    // console.log(products)
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
    const clickHandler = (e) => {
        setRate(prev => {
            if (prev.includes(e.target.value)) {
                return prev.filter((n) => n !== e.target.value)

            }
            return [...prev, e.target.value]

        })
    }
    console.log(products);
    return (
        <Box style={{ height: 'calc(100vh - 55px)', boxSizing: 'border-box', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
            <Box style={{ backgroundColor: 'white', height: '100%', width: '17%' }}>
                <Box style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                    <Typography style={{ fontFamily: 'inherit', fontSize: '1.4rem', fontWeight: '400' }}>Filters</Typography>
                </Box>
                <Box style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                    <Typography style={{ fontFamily: 'inherit', fontSize: '1rem', fontWeight: '400', fontWeight: '400' }}>Price</Typography>
                    <RangeSlider values={values} setValues={setValues} />
                    <Box style={{ margin: 'auto', width: "fit-content", wordSpacing: '5px' }}>
                        <Typography>₹{values[0]} to ₹{values[1]}</Typography>
                    </Box>
                </Box>
                <Box style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                    <Typography style={{ fontFamily: 'inherit', fontSize: '1rem', fontWeight: '400' }}>Customer Rating</Typography>
                    <Box>
                        <Box>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="4★ & above" value={4} onClick={(e) => clickHandler(e)} />
                                <FormControlLabel control={<Checkbox />} label="3★ & above" value={3} onClick={(e) => clickHandler(e)} />
                                <FormControlLabel control={<Checkbox />} label="2★ & above" value={2} onClick={(e) => clickHandler(e)} />
                                <FormControlLabel control={<Checkbox />} label="1★ & above" value={1} onClick={(e) => clickHandler(e)} />
                            </FormGroup>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box style={{ backgroundColor: 'white', minHeight: '100%', width: 'calc(82%)', height: 'fit-content' }}>
                <Box style={{ display: 'flex', width: '100%' }}>
                    <Box style={{ width: '100%' }}>
                        <BasicTabs filteredProducts={products} />
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default Filters