import React, { useContext } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { CollectionManagerProvider}  from './context'
import CollectionTable from './components/CollectionsTable'

const IndexManager = () => {

  return (

 <React.Fragment>
 <CssBaseline />
 <Container sx={{mt: 5}}>
  <CollectionManagerProvider>
    <CollectionTable/>
  </CollectionManagerProvider>
 </Container>
</React.Fragment>
  )
}
export default IndexManager
