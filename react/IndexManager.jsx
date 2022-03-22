import React from 'react'

import CollectionsTable from './components/CollectionsTable'

import { CollectionManagerProvider}  from './context'

const IndexManager = () => {
  return (
    <CollectionManagerProvider>
    <div>
      <CollectionsTable/>
    </div>
    </CollectionManagerProvider>

  )
}
export default IndexManager
