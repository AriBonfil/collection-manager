import React from 'react'
import { ICollection } from '../../../context/useCollections';

const CollectionInfo:React.FC<{data: ICollection } & JSX.IntrinsicElements["div"]> = ({data, ...props}) => {

  if(!data) return null;

  return (
    <div {...props} className="ph5">
      <div className='flex'>
        <div className='w-50'>
          <p>Nombre: <span className='b'>{data.name}</span></p>
          <p>ID: <span className='b'>{data.id}</span></p>
          <p>Highlight <span className='b'>{data.highlight ? 'Si' : 'No' }</span></p>
          <p>Searchable <span className='b'>{data.searchable ? 'Si' : 'No' }</span></p>
        </div>
        <div className='w-50'>
          <p>Tipo: <span className='b'>{data.type}</span></p>
          <p>Date From: <span className='b'>{new Date(data.dateFrom).toLocaleString()}</span></p>
          <p>Date To: <span className='b'>{new Date(data.dateTo).toLocaleString()}</span></p>
          <p>Total de productos: <span className='b'>{data.totalProducts}</span></p>
        </div>
      </div>
      {data.description && <p>Descripción: <span className='b'>{data.description}</span></p>}
    </div>
  )
}

export default CollectionInfo
