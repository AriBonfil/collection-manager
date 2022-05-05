// import React, {useState} from 'react'
// import { useCollectionManager } from '../../../context'
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';


// const ActiveInactiveFilter = () => {
// const [selected, setSelected] = useState<string>()
// const { searchParams, setSearchParams } = useCollectionManager();
//    const handleChange = (value:string) => {
//     switch (value) {
//       case 'active':
//       setSearchParams({
//         ...searchParams,
//         get: 'active'
//       })
//         break;
//       case 'inactive':
//         setSearchParams({
//           ...searchParams,
//           get: 'inactive'
//         })
//           break;
//       case 'all':
//         setSearchParams({
//           ...searchParams,
//           get: 'all'
//         })
//       break;
//       default:
//         break;
//     }
//     setSelected(value)

//   };

//   return (
//     <>
//     <Box sx={{ minWidth: 120,  width: 'auto' }}>
//     <FormControl fullWidth>
//       <InputLabel id="demo-simple-select-label">Active/Inactive</InputLabel>
//       <Select
//         labelId="demo-simple-select-label"
//         id="demo-simple-select"
//         value={selected}
//         label="Active/Inactive"
//         onChange={(v)=> handleChange(v.target.value)}
//       >
//         <MenuItem value='active'>Solo Activas</MenuItem>
//         <MenuItem value='inactive'>Solo Inactivas</MenuItem>
//         <MenuItem value='all'>Mostrar Todas</MenuItem>
//       </Select>
//     </FormControl>
//   </Box>
//   </>
//   )
// }

// export default ActiveInactiveFilter
