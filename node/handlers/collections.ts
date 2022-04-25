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
          arrItems.push({
            ...item,
            active: isCollectionActive(inactiveCollections, item.id)
          })
        });
      }
    }
    data = {...data, items: arrItems}
    if(res?.paging){
      let pagination : IPagination = {
        perPage: res.paging.perPage,
        total: res.paging.total,
        pages: res.paging.pages
      }
      data = {...data, pagination}
    }
    //Filters:
    if(query.get)
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
  if(query.get && data && data.items)
  {
    let newData : ICollectionsResponse = {}
    let filteredItems: Array<ICollection> = []
    switch (query.get) {
      case 'active':
        filteredItems = data.items.filter(i => i.active === true)
        break;
      case 'inactive':
        filteredItems = data.items.filter(i => i.active === false)
        break;
      case 'all':
        filteredItems = data.items
        break;
      default: break;
    }
    let newPagination : IPagination = {
      perPage: PAGE_SIZE,
      total: filteredItems.length,
      pages: Math.ceil((filteredItems.length) / PAGE_SIZE)
    }
    newData = {...data, items: filteredItems, pagination: newPagination}

    return newData
  }
  return {}
}


