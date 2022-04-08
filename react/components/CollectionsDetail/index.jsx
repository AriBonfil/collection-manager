import React, {useEffect, useState} from 'react'
import CollectionInfo from './components/CollectionInfo'
import CollectionProducts from './components/CollectionProducts'
import styled from 'styled-components';
const index = ({id}) => {
  const [data, setData] = useState({})
  useEffect(() => {
    fetch(`/_v/collections/${id}`)
    .then(res => res.json())
    .then(resJson => {
      setData(resJson)
    })
    .catch(err => console.log("error al req", err));
  }, [])

  const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  `

  return (
    <>{data ?
    <Container>
      <CollectionInfo data={data.collection}/>
      <CollectionProducts data={data.products}/>
    </Container>
    : <div>Loading...</div>}
    </>

  )
}

export default index
