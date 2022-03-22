import React, {useState, useContext} from 'react'
import Pagination from 'rc-pagination'
import localeInfo from 'rc-pagination/es/locale/es_ES'
import './rc-pagination.css'
import { CollectionManagerContext } from '../../context'
const RenderPagination = () => {
const { paginationProps, setpaginationProps, setSearchParams, searchParams } = useContext(CollectionManagerContext);
 const onChange = page => {
  setSearchParams({
    actualPage: page
  })
  };
  return (
    <>
    {paginationProps?.total &&
    <Pagination
    onChange={onChange}
    current={searchParams?.actualPage}
    total={paginationProps?.total}
    pageSize={paginationProps?.pageSize}
    locale = {localeInfo}
    />}

  </>
  )
}

export default RenderPagination
