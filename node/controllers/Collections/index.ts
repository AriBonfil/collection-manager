import { Context } from "vm";

const getCollectionsController = async (ctx: Context, next: () => Promise<any>) => {

try {

console.log("CTXXXss", ctx.clients)
ctx.status = 200

ctx.set('cache-control', 'no-cache')
await next();
} catch (error) {
console.error(error)
}
}

  export { getCollectionsController }
