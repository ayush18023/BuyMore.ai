import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider({ values, setValues }) {
    const [value, setValue] = React.useState([500, 30000]);

    const handleChange = (event, newValue) => {
        setValues(newValue)
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100 % ' }}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={100}
                max={50000}
            />
        </Box>
    );
}