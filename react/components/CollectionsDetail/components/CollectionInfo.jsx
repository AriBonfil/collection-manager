import React from 'react'

const CollectionInfo = ({data}) => {
  return (
    <>
    {data && <div>

      <h6>Product name: {data.Name}</h6>
      <h6>Product id: {data.Id}</h6>
      <p>Description: {data.Description}</p>
      <h6>Searchable {data.Searchable ? 'Si' : 'No' }</h6>
      <h6>Highlight {data.Highlight ? 'Si' : 'No' }</h6>
      <h6>Date From {data.DateFrom}</h6>
      <h6>Date To {data.DateTo}</h6>
      <h6>Total Products: {data.TotalProducts}</h6>
      <h6>Type: {data.Type}</h6>
      </div>}
    </>
  )
}

export default CollectionInfo
