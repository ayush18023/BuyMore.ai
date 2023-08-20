import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './hover.css'
import { useNavigate } from 'react-router-dom';
import noresults from '../../assets/noresults.png'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ filteredProducts }) {
    const [value, setValue] = React.useState(0);
    const products = filteredProducts
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const nav = useNavigate()
    const clickHandler = (id) => {
        nav(`/product/${id}`)
    }
    if (value === 0) {
        products.sort(function (a, b) { return (a.price.cost - b.price.cost) })
    }
    else {
        products.sort(function (a, b) { return (b.price.cost - a.price.cost) })
    }
    console.log(products)
    return (
        <Box style={{ width: '100% !important' }}>
            <Box style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography style={{ padding: '6px', margin: 'auto 0', fontWeight: '500' }}>Sort By</Typography>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Price-Low to High" {...a11yProps(0)} />
                            <Tab label="Price-High to Low" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                </Box>
            </Box>
            <Box>
                <TabPanel value={value} index={0}>
                    {products.length ? <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            products.map((product, index) => {
                                let mar = '0%'
                                if (index % 4 != 0) {
                                    mar = '3%'
                                }
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '20%', padding: '16px', marginLeft: `${mar}` }} className='effect' onClick={() => clickHandler(product.id)}>
                                        <div style={{ textAlign: 'center' }}><img src={product.url} style={{ height: '280px', width: 'auto' }}></img></div>
                                        <div>
                                            <p style={{ margin: '0', padding: '0', fontSize: '14px', paddingBottom: '5px' }}>{product.title.longTitle}</p>
                                            <p style={{ margin: '0', padding: '0', fontSize: '12px', paddingBottom: '5px', color: '#878787', wordWrap: 'break-word' }}>{product.tagline}</p>
                                            <div style={{ display: 'flex', paddingBottom: '5px' }}>
                                                <p style={{ margin: '0', padding: '2px 4px 2px 6px', fontSize: '12px', color: 'white', background: "#388e3c" }}>{product?.rating}★</p>
                                                <p style={{ margin: '0', padding: '0', paddingLeft: '8px', fontSize: '14px', color: '#878787' }}>({product?.review})</p>
                                            </div>
                                            <div style={{ paddingBottom: '5px' }}>
                                                <div style={{ margin: ' 0', padding: '0', fontSize: '1rem', color: '#212121', display: 'inline-block' }}>₹{product?.price?.cost}</div>&nbsp;&nbsp;&nbsp;
                                                <div style={{ margin: ' 0', padding: '0', fontSize: '14px', color: '#878787', display: 'inline-block' }}><strike>₹{product?.price?.mrp}</strike></div>&nbsp;&nbsp;&nbsp;
                                                <div style={{ margin: ' 0', padding: '0', fontSize: '13px', color: '#388e3c', display: 'inline-block' }}>{product?.price?.discount} off</div>
                                            </div>
                                            <p style={{ margin: '0', padding: '0', fontSize: '12px' }}>Free delivery</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Box>
                        :
                        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 167px)', flexDirection: 'column' }}>
                            <img src={noresults}></img>
                            <Typography style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Sorry, no results found!</Typography>
                        </Box>
                    }
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {products.length ? <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            products.map((product, index) => {
                                let mar = '0%'
                                if (index % 4 != 0) {
                                    mar = '3%'
                                }
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '20%', padding: '16px', marginLeft: `${mar}` }} className='effect' onClick={() => clickHandler(product.id)}>
                                        <div style={{ textAlign: 'center' }}><img src={product.url} style={{ height: '280px', width: 'auto' }}></img></div>
                                        <div>
                                            <p style={{ margin: '0', padding: '0', fontSize: '14px', paddingBottom: '5px' }}>{product.title.longTitle}</p>
                                            <p style={{ margin: '0', padding: '0', fontSize: '12px', paddingBottom: '5px', color: '#878787', wordWrap: 'break-word' }}>{product.tagline}</p>
                                            <div style={{ display: 'flex', paddingBottom: '5px' }}>
                                                <p style={{ margin: '0', padding: '2px 4px 2px 6px', fontSize: '12px', color: 'white', background: "#388e3c" }}>{product?.rating}★</p>
                                                <p style={{ margin: '0', padding: '0', paddingLeft: '8px', fontSize: '14px', color: '#878787' }}>({product?.review})</p>
                                            </div>
                                            <div style={{ paddingBottom: '5px' }}>
                                                <div style={{ margin: ' 0', padding: '0', fontSize: '1rem', color: '#212121', display: 'inline-block' }}>₹{product?.price?.cost}</div>&nbsp;&nbsp;&nbsp;
                                                <div style={{ margin: ' 0', padding: '0', fontSize: '14px', color: '#878787', display: 'inline-block' }}><strike>₹{product?.price?.mrp}</strike></div>&nbsp;&nbsp;&nbsp;
                                                <div style={{ margin: ' 0', padding: '0', fontSize: '13px', color: '#388e3c', display: 'inline-block' }}>{product?.price?.discount} off</div>
                                            </div>
                                            <p style={{ margin: '0', padding: '0', fontSize: '12px' }}>Free delivery</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Box>
                        :
                        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 167px)', flexDirection: 'column' }}>
                            <img src={noresults}></img>
                            <Typography style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Sorry, no results found!</Typography>
                        </Box>
                    }
                </TabPanel>
            </Box>
        </Box>
    );
}