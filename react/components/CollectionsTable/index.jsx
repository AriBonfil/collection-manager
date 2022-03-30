import React, { useState, useEffect, useContext } from 'react'

import Table from './Table'
import RenderPagination from './RenderPagination'
import { CollectionManagerContext } from '../../context'
import Filters from './Filters'
const CollectionsTable = () => {
  const { data, paginationProps, setSearchParams, searchParams } = useContext(CollectionManagerContext);

  return (
    <>
      <Filters/>
      <Table/>
      <RenderPagination/>
    </>
  )


}
export default CollectionsTable
