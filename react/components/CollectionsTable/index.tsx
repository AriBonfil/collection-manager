import React from 'react'
import styled from 'styled-components'
import Table from './Table'
import RenderPagination from './RenderPagination'
import Filters from './Filters'
import EditButton from './EditButton'
import ClearAllButton from './ClearAllButton'
import SelectedActions from './SelectedActions'
import SelectAllButton from './SelectAllButton'
const CollectionsTable = () => {
const TopBar = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
`

  return (
    <div className="xdd">
      <TopBar>
        <Filters/>
        <EditButton/>
        <SelectAllButton/>
        <ClearAllButton/>
      </TopBar>
      <Table/>
      <RenderPagination/>
      <SelectedActions/>
    </div>
  )


}
export default CollectionsTable
