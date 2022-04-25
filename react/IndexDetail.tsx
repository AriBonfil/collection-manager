import React from 'react'
import CollectionDetail from './components/CollectionsDetail'
import styled from 'styled-components'

export default ({params}:{params:any}) => {
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
