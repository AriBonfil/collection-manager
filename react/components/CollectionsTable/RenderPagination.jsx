import React, {useState,useEffect, useContext} from 'react'
import Pagination from 'rc-pagination'
import localeInfo from 'rc-pagination/es/locale/es_ES'
import './rc-pagination.css'
import { CollectionManagerContext } from '../../context'
const RenderPagination = () => {
const { paginationProps, setpaginationProps, setSearchParams, searchParams, setactualPage, actualPage } = useContext(CollectionManagerContext);
 const onChange = page => {
  setactualPage(page)
  };
  useEffect(() => {
    console.log("para su canto");
  }, [])

  return (
    <>
    {paginationProps?.total &&
      <div>
        <Pagination
        onChange={onChange}
        current={actualPage}
        total={paginationProps?.total}
        defaultPageSize={paginationProps?.pageSize}
        locale = {localeInfo}
        />
        <p>Total {paginationProps.total} colecciones</p>

      </div>
    }

  </>
  )
}

export default RenderPagination
