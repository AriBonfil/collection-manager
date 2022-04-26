import React from 'react'
import Table from './Table'
// import RenderPagination from './RenderPagination'
// import Filters from './Filters'
// import EditButton from './EditButton'
// import ClearAllButton from './ClearAllButton'
// import SelectedActions from './SelectedActions'
// import SelectAllButton from './SelectAllButton'
import {
  //@ts-ignore
  PageBlock, Layout, PageHeader
} from 'vtex.styleguide'

const CollectionsTable = () => (
  <div >
    <Layout pageHeader={<PageHeader title="Colecciones" />}>
      <PageBlock>
        <Table/>
      </PageBlock>
    </Layout>
    {/* <TopBar>
      <Filters/>
      <EditButton/>
      <SelectAllButton/>
      <ClearAllButton/>
    </TopBar> */}
    {/* <RenderPagination/> */}
    {/* <SelectedActions/> */}
  </div>
);
export default CollectionsTable
