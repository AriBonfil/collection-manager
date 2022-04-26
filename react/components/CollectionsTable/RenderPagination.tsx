import React from 'react'
import Pagination from 'rc-pagination'
// @ts-ignore
import localeInfo from 'rc-pagination/es/locale/es_ES'
// import './rc-pagination.css'
import { useCollectionManager } from '../../context'
const RenderPagination = () => {
  const {
    paginationProps,
    setactualPage,
    actualPage
  } = useCollectionManager();

  return (
    <>
    {paginationProps?.total &&
      <div>
        <Pagination
          onChange={setactualPage}
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
