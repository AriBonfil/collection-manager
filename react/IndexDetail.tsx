import React from 'react'
import CollectionDetail from './components/CollectionsDetail'
import { ProviderSearchParameters } from './utils/searchParameters';

export default ({params}:{params:any}) => {
  return (
    <ProviderSearchParameters >
      <CollectionDetail id={params.id}/>
    </ProviderSearchParameters>
  );
}
