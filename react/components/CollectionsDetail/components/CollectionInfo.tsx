import React from 'react'
import { ICollection } from '../../CollectionsTable/SelectedActions/actions/useCollections';

const CollectionInfo:React.FC<{data: ICollection } & JSX.IntrinsicElements["div"]> = ({data, ...props}) => {

  if(!data) return null;

  return (
    <div {...props}>
      <p>Product name: {data.name}</p>
      <p>Product id: {data.id}</p>
      <p>Searchable {data.searchable ? 'Si' : 'No' }</p>
      <p>Highlight {data.highlight ? 'Si' : 'No' }</p>
      <p>Date From {data.dateFrom}</p>
      <p>Date To {data.dateTo}</p>
      <p>Total Products: {data.totalProducts}</p>
      <p>Type: {data.type}</p>
      <p>Description: {data.description}</p>
    </div>
  )
}

export default CollectionInfo
