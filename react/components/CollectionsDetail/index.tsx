import React from 'react'
import { useQuery } from 'react-apollo'
import CollectionInfo from './components/CollectionInfo'

//@ts-ignore
import GET_COLLECTION from '../../graphql/getCollection.gql'
//@ts-ignore
import FIND_PRODUCTS_BY_COLLECTIONS from '../../graphql/findProductsByCollections.gql'


import {
  //@ts-ignore
  PageBlock, Layout, PageHeader
} from 'vtex.styleguide'
import CollectionProducts from './components/CollectionProducts'

const useCollection = (id:string)=>{
  const {data,loading, error} = useQuery(GET_COLLECTION, {
    variables:{ id }
  });

  return [data?.collection, loading, error] as [typeof data, typeof loading, typeof error]
}

type ProductsRespongse = {
  items: ProductType[]
  paging: {
    page: number
    perPage: number
    total: number
    pages: number
  }
}
type ProductType = {
  id: number
  name: string
  imageUrl: string
  ref: number
  detailUrl: string
}
export const useProductsByCollection = (id:string | number, {
  page, pageSize
}:{
  page:number,
  pageSize: number
})=>{
  const {data,loading, error} = useQuery<{products: ProductsRespongse}>(FIND_PRODUCTS_BY_COLLECTIONS, {
    variables:{ collectionId: id, page,pageSize }
  });

  return [data?.products, loading, error] as [ProductsRespongse, typeof loading, typeof error]
}

const index: React.FC<{id: string}> = ({id}) => {
  const [collection, loading] = useCollection(id);

  if(loading) return null;

  return (
    <Layout pageHeader={<PageHeader title={collection?.name}
        linkLabel="Volver"
      />}>
      <PageBlock>
        <CollectionInfo data={collection}/>
        <CollectionProducts id={id}/>
      </PageBlock>
    </Layout>
  )
}

export default index
