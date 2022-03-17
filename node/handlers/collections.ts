 import { ICollection } from '../interfaces';
const PAGE_SIZE : Number = 50
export async function getCollections(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { collection },
  } = ctx

  let data : Array<ICollection> = []
  try {
    let res = await collection.getActiveCollections(1, PAGE_SIZE)
    let inactiveCollections = await collection.getInactiveCollections()
    let reqIterations = res?.paging?.pages
   for (let i = 0; i < reqIterations; i++) {

    let res = await collection.getActiveCollections(i+1, 50)
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
        data.push(itemToAdd)
      });
    }
    }
    ctx.body = JSON.stringify(data)
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
