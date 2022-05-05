import React from 'react'
import { CollectionManagerProvider}  from './context'
import CollectionTable from './components/CollectionsTable'
import { RequestProvider } from "react-request-hook";
// import { QueryParamProvider } from 'use-query-params';
import axios from 'axios';
//@ts-ignore
import { ToastProvider } from 'vtex.styleguide'
import { ProviderSearchParameters } from './utils/searchParameters';

//@ts-ignore
// import { globalHistory } from '@reach/router';

const axiosInstance = axios.create({
  baseURL: `/_v/`,
});

export default () => {
  return (
    <ProviderSearchParameters>
      <RequestProvider value={axiosInstance}>
        <CollectionManagerProvider>
          <ToastProvider>
            <CollectionTable/>
          </ToastProvider>
        </CollectionManagerProvider>
      </RequestProvider>
    </ProviderSearchParameters>
  )
}
