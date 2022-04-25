import React from 'react'
import { CollectionManagerProvider}  from './context'
import CollectionTable from './components/CollectionsTable'

export default () => {
  return (
    <React.Fragment>
      <CollectionManagerProvider>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 5rem', fontFamily: '"Roboto","Helvetica","Arial",sans-serif'}}>
          <CollectionTable/>
        </div>
      </CollectionManagerProvider>
    </React.Fragment>
  )
}
