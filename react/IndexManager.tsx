import React from 'react'
import { CollectionManagerProvider}  from './context'
import CollectionTable from './components/CollectionsTable'
import { RequestProvider } from "react-request-hook";
import { QueryParamProvider } from 'use-query-params';
import axios from 'axios';
//@ts-ignore
// import { globalHistory } from '@reach/router';

const axiosInstance = axios.create({
  baseURL: `/_v/`,
});

export default () => {
  return (
    <React.Fragment>
      <QueryParamProvider>
        <RequestProvider value={axiosInstance}>
          <CollectionManagerProvider>
              <CollectionTable/>
          </CollectionManagerProvider>
        </RequestProvider>
      </QueryParamProvider>
    </React.Fragment>
  )
}
