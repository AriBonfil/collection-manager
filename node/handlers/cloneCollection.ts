
export async function cloneCollection(ctx: Context, next: () => Promise<any>) {
  const {
    clients: {  collection  },
  } = ctx
try{
  const id : String = ctx.url.split("/")[ctx.url.split("/").length-1]
  let getCollectionRes = await collection.getCollection(id)
  if(getCollectionRes.ok) {
    let cloneCollectionRes = await collection.cloneCollection(getCollectionRes.res)
    ctx.body = {
      ok: true,
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
