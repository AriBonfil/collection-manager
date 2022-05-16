import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from 'react-apollo'
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
import { GoToMain } from '../CollectionsTable/Table'

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
  page, pageSize, term
}:{
  page:number,
  pageSize: number,
  term?: string
})=>{
  const [resquest,{data,loading, error}] = useLazyQuery<{products: ProductsRespongse}>(FIND_PRODUCTS_BY_COLLECTIONS, {
    variables:{ collectionId: id+"", page,pageSize, term }
  });

  useEffect(()=>{
    if(!id) return;
    resquest();
  },[id, page, pageSize, term]);

  return [data?.products, loading, error, resquest] as [ProductsRespongse, typeof loading, typeof error, typeof resquest]
}

const index: React.FC<{id: string}> = ({id}) => {
  const [collection, loading] = useCollection(id);

  if(loading) return null;

  return (
    <Layout pageHeader={<PageHeader title={collection?.name}
        linkLabel="Volver"
        onLinkClick={GoToMain}
      />}>
      <PageBlock>
        <CollectionInfo data={collection}/>
        <CollectionProducts className='mt6' id={id}/>
      </PageBlock>
    </Layout>
  )
}

export default index
