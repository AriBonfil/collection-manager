
export async function cloneCollection(ctx: Context, next: () => Promise<any>) {
  const {
    clients: {  collection  },
  } = ctx
try{
  const id : String = ctx.url.split("/")[ctx.url.split("/").length-1]
  let res = await collection.getCollection(id)
  ctx.body = {
    ok: true,
    res
  }
  ctx.status = res.status
  ctx.set('cache-control', 'no-cache')
  await next()
} catch (error) {
  ctx.body = {
    ok: false,
  }
  console.error("error", error)
}
}
