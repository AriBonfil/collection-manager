import { ICollectionsResponse, ICollection, IPagination } from '../interfaces';
 const PAGE_SIZE : number = 50
export async function getCollections(ctx: Context, next: () => Promise<any>) {
  const {
    clients: {  collection  },
    query
  } = ctx


  try {
  let res = await collection.getCollections(1, PAGE_SIZE)
  let inactiveCollections = await collection.getInactiveCollections()
  let reqIterations = res?.paging?.pages
  let data : ICollectionsResponse = {}
  let arrItems : Array<ICollection> = []
  for (let i = 0; i < reqIterations; i++) {
    let res = await collection.getCollections(i+1, PAGE_SIZE)
    if(res?.items){
      res.items.forEach((item: any) => {
        let itemToAdd : ICollection = {
          id: item.id,
          name: item.name,
          searchable: item.searchable,
          highlight: item.highlight,
          dateFrom: item.dateFrom,
          dateTo: item.dateTo,
          totalSku: item.totalSku,
          totalProducts: item.totalProducts,
          type: item.type,
          lastModifiedBy: item.lastModifiedBy,
          active: isCollectionActive(inactiveCollections, item.id)
        }
        arrItems.push(itemToAdd)
        data = {...data, items: arrItems}
      });
    }
    }
    if(res?.paging){

      let pagination : IPagination = {
        perPage: res.paging.perPage,
        total: res.paging.total,
        pages: res.paging.pages
      }
      data = {...data, pagination}
    }
    //Filters:

    if(query.active)
    {
      data = await filterByActive(data, query)
    }

    ctx.body =  JSON.stringify(data)
    ctx.status = 200
    ctx.set('cache-control', 'no-cache')
    await next()
  } catch (error) {
    console.error("error", error)
  }

}

 function isCollectionActive(inactiveCollections: Array<any>, collectionId: String): boolean{
  let isActive: boolean = false
  if(inactiveCollections){
  let matchingCollection = inactiveCollections.find((c: String) => c === collectionId)
  matchingCollection ? isActive = false : isActive = true
  }
    return isActive
}

async function filterByActive(data: ICollectionsResponse, query: any){
  // Available filters: active
  if(query.active && data && data.items)
  {
    let newData : ICollectionsResponse = {}
    let active: boolean = query.active === 'true' ? true : false
    let filteredItems = data.items?.filter(i => i.active === active)
    let newPagination : IPagination = {
      perPage: PAGE_SIZE,
      total: filteredItems.length,
      pages: Math.ceil((filteredItems.length) / PAGE_SIZE)
    }

    newData = {...newData, items: filteredItems, pagination: newPagination}

    return newData
  }
  return {}
}


