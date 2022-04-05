import React, { useContext } from 'react'
import { CollectionManagerProvider}  from './context'
import CollectionTable from './components/CollectionsTable'
const IndexManager = () => {

  return (

 <React.Fragment>
  <CollectionManagerProvider>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 5rem'}}>
    <CollectionTable/>
  </div>
  </CollectionManagerProvider>

</React.Fragment>
  )
}
export default IndexManager
