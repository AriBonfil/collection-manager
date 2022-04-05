import React, { useContext } from 'react'
import CollectionDetail from './components/CollectionsDetail'
import styled from 'styled-components'
const IndexDetail = ({
  params,
}) => {
  const Container = styled.div`
  background-color: lightgray;
`
  return (

 <React.Fragment>
 <Container>
    <CollectionDetail id={params.id}/>
 </Container>
</React.Fragment>
  )
}
export default IndexDetail
