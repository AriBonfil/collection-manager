
export async function cloneCollection(ctx: Context, next: () => Promise<any>) {
  const {
    clients: {  collection  },
  } = ctx
try{
  const id : string = ctx.url.split("/")[ctx.url.split("/").length-1]
  const newCollection = await collection.cloneCollection(id);

  ctx.body = JSON.stringify(newCollection);

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
