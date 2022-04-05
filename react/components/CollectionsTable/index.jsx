import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Table from './Table'
import RenderPagination from './RenderPagination'
import { CollectionManagerContext } from '../../context'
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
    <>
    <TopBar>
      <Filters/>
      <EditButton/>
      <SelectedActions/>
      <SelectAllButton/>
      <ClearAllButton/>
    </TopBar>
      <Table/>
      <RenderPagination/>
    </>
  )


}
export default CollectionsTable
