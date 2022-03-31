import React, { useContext } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CollectionDetail from './components/CollectionsDetail'

const IndexDetail = ({
  params,
}) => {
  return (

 <React.Fragment>
 <CssBaseline />
 <Container sx={{mt: 5}}>
    <CollectionDetail id={params.id}/>
 </Container>
</React.Fragment>
  )
}
export default IndexDetail
