const getCollections = async (ctx: Context, next: () => Promise<any>) => {

try {

ctx.status = 200
ctx.set('cache-control', 'no-cache')
await next();
} catch (error) {
console.error(error)
}
}

export { getCollections }
