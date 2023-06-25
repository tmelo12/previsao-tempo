'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { municipios } from '@/constants/municipios';

export default function InputSelect() {
  const [city, setCity] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Muncípio</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="Município"
          onChange={handleChange}
          fullWidth
        >
          {municipios.map(item => (
            <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
          ))
          }
        </Select>
      </FormControl>
    </Box>
  );
}