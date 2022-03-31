import React from 'react'

const CollectionProducts = ({data}) => {
  return (
    <>
    {data?.map((p, index) => (
      <li key={index}>
        <h3>Product Id: {p.productId}</h3>
        <h3>Product Name: {p.productName}</h3>
        <h3>Sku Id: {p.skuId}</h3>
        <h3>image url {p.skuImageUrl}</h3>
        <h3>Sub Collection ID {p.subCollectionId}</h3>
      </li>
    ))}
    </>
  )
}

export default CollectionProducts
