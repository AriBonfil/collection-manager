import React from 'react'
import { useQuery } from 'react-apollo'

const CollectionsTable = () => {

  fetch('/_v/collections')
    .then(response => response.json())
    .then(response => console.log("datos", response))
    .catch(err => console.error(err));

  return <div>hola</div>
}
export default CollectionsTable
