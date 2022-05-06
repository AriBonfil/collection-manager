import React from 'react'
import {Table} from './Table'

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
  </div>
);
export default CollectionsTable
