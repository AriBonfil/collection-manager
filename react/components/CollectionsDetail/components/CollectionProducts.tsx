import React from 'react'
import styled from 'styled-components'
//# ANY #
const CollectionProducts:React.FC<{data: any[]}> = ({data}) => {
  const ProductsList = styled.ul`
    background-color: white;
    border-radius: 10px;
    font-size: 12px;
    max-height: 90vh;
    overflow: auto;
    list-style: none;
    `
  const ProductListItem = styled.li`
    background-color: cornsilk;
    padding: 17px;
    border-radius: 17px;
    margin: 10px;
  `
  return (
    <>
      {
        data &&
        <ProductsList>
          {data?.map((p, index) => (
            <ProductListItem key={index}>
              <img title='Imagen de Producto' style={{width: '50px'}} src={p.skuImageUrl}></img>
              <h3>Product Id: {p.productId}</h3>
              <h3>Product Name: {p.productName}</h3>
              <h3>Sku Id: {p.skuId}</h3>
              <h3>Sub Collection ID {p.subCollectionId}</h3>
            </ProductListItem>
          ))}
        </ProductsList>
      }
    </>
  )
}

export default CollectionProducts
