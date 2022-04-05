import React, {useState, useContext} from 'react'
import { CollectionManagerContext } from '../../../context'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const ActiveInactiveFilter = () => {
const [selected, setSelected] = useState()
const { searchParams, setSearchParams } = useContext(CollectionManagerContext);
   const handleChange = (event) => {
    console.log("event.target.value: ", event.target.value)
    switch (event.target.value) {
      case 'active':
      setSearchParams({
        ...searchParams,
        get: 'active'
      })
        break;
      case 'inactive':
        setSearchParams({
          ...searchParams,
          get: 'inactive'
        })
          break;
      case 'all':
        setSearchParams({
          ...searchParams,
          get: 'all'
        })
      break;
      default:
        break;
    }
    setSelected(event.target.value)

  };

  return (
    <>
    <Box sx={{ minWidth: 120,  width: 'auto' }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Active/Inactive</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selected}
        label="Active/Inactive"
        onChange={handleChange}
      >
        <MenuItem value='active'>Solo Activas</MenuItem>
        <MenuItem value='inactive'>Solo Inactivas</MenuItem>
        <MenuItem value='all'>Mostrar Todas</MenuItem>
      </Select>
    </FormControl>
  </Box>
  </>
  )
}

export default ActiveInactiveFilter
