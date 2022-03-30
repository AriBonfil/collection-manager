import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import CollectionsTable from './components/CollectionsTable'

import { CollectionManagerProvider}  from './context'

const IndexManager = () => {
  return (

 <React.Fragment>
 <CssBaseline />
 <Container sx={{mt: 5}}>
  <CollectionManagerProvider>
    <CollectionsTable/>
  </CollectionManagerProvider>
 </Container>
</React.Fragment>
  )
}
export default IndexManager
