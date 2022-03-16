export async function test(ctx: Context, next: () => Promise<any>) {
    const {
      clients: { analytics },
    } = ctx


    ctx.body = await analytics.getLiveUsers()
    ctx.status = 200

    ctx.set('cache-control', 'no-cache')
     await next()
  }
