import React, {useEffect, useState} from 'react'
import CollectionInfo from './components/CollectionInfo'
const index = ({id}) => {
  const [data, setData] = useState({})
  useEffect(() => {
    fetch(`/_v/collections/${id}`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      setData(resJson)
    })
    .catch(err => console.log("error al req", err));
  }, [])

  return (
    <>{data ?
    <div>
      <CollectionInfo data={data.collection}/>
    </div>
    : <div>Loading...</div>}
    </>

  )
}

export default index
