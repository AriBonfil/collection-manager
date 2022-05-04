import { IProduct } from "../interfaces"

/*  import {ICollectionResponse ,  IProduct  } from "../interfaces" */
export async function getCollection(ctx: Context, next: () => Promise<any>) {

try{
  const {
    clients: {  collection  },
  } = ctx

  const id : String = ctx.url.split("/")[ctx.url.split("/").length-1]
  let collectionData = await collection.getCollection(id)
  let collectionProducts = await collection.getCollectionProducts(id, 1)
  let reqIterations = collectionProducts?.TotalPage
  let arrProducts : Array<IProduct> = []
  for (let i = 0; i < reqIterations; i++) {
    let res = await collection.getCollectionProducts(id, i+1)
    if(res?.Data){
      res.Data.forEach((item: any) => {
        let itemToAdd : IProduct = {
          productId: item.ProductId,
          skuId: item.SkuId,
          subCollectionId: item.SubCollectionId,
          position: item.Position,
          productName: item.ProductName,
          skuImageUrl: item.SkuImageUrl
        }
        arrProducts.push(itemToAdd)

      });
    }
    }
  var data = { collection: collectionData, products: arrProducts}
  ctx.set('cache-control', 'no-store')
  ctx.body =  JSON.stringify(data)
  ctx.status = 200
  await next()
} catch (error) {
  console.error("error", error)
}
}
