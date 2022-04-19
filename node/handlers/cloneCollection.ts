import { ICollectionNative } from "../interfaces"

export async function cloneCollection(ctx: Context, next: () => Promise<any>) {
  const {
    clients: {  collection  },
  } = ctx
try{
  const id : String = ctx.url.split("/")[ctx.url.split("/").length-1]
  let getCollectionRes = await collection.getCollection(id)

  let getCollectionProductsRes = await collection.getCollectionProducts(getCollectionRes.Id, 1)
  console.log(getCollectionProductsRes)
  if(getCollectionRes)
  {
   let newCollectionData : ICollectionNative = {
      name: getCollectionRes.Name,
      description: getCollectionRes.Description,
      searchable: getCollectionRes.Searchable,
      highlight: getCollectionRes.Highlight,
      dateFrom: getCollectionRes.DateFrom,
      dateTo: getCollectionRes.DateTo
   }
   let cloneCollectionRes = await collection.cloneCollection(newCollectionData)
   if(cloneCollectionRes){

   }
  }

  ctx.status = 200
  ctx.set('cache-control', 'no-cache')
  await next()
} catch (error) {
  ctx.body = {
    ok: false,
  }
  console.error("error", error)
}
}
