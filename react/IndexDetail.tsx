import React from 'react'
import CollectionDetail from './components/CollectionsDetail'
import { QueryParamProvider } from 'use-query-params';

export default ({params}:{params:any}) => {
  return (
    <QueryParamProvider >
      <CollectionDetail id={params.id}/>
    </QueryParamProvider>
  );
}
