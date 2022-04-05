import React from 'react'
import styled from 'styled-components'
const CollectionInfo = ({data}) => {
  const Container = styled.div`
  background-color: white;
  margin: 2rem;
  padding: 2rem;
  border-radius: 21px;
  width: fit-content;
  height: fit-content;
  font-size: larger;
}`
  return (
    <>
    {data && <Container>
      <h6>Product name: {data.Name}</h6>
      <h6>Product id: {data.Id}</h6>
      <h6>Searchable {data.Searchable ? 'Si' : 'No' }</h6>
      <h6>Highlight {data.Highlight ? 'Si' : 'No' }</h6>
      <h6>Date From {data.DateFrom}</h6>
      <h6>Date To {data.DateTo}</h6>
      <h6>Total Products: {data.TotalProducts}</h6>
      <h6>Type: {data.Type}</h6>
      <p>Description: {data.Description}</p>
      </Container>}
    </>
  )
}

export default CollectionInfo
