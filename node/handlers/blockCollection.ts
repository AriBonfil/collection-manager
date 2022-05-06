import { json } from 'co-body'

type TableA = (string | number)[];

export type createBlockType = {
  ids:  TableA
}

export async function getBlockCollection(ctx: Context) {
  const list = await BlockManager.Get(ctx).getIndexAll();

  ctx.set('cache-control', 'no-cache')
  ctx.body =  JSON.stringify(list)
  ctx.status = 200
}

export async function setBlockCollection(ctx: Context) {
  const { ids } = await json(ctx.req) as createBlockType;

  await BlockManager.Get(ctx).pushIndex(ids);

  ctx.set('cache-control', 'no-cache')
  ctx.body =  JSON.stringify(ids)
  ctx.status = 200
}

export async function removeBlockCollection(ctx: Context) {
  const { ids } = await json(ctx.req) as createBlockType;

  await BlockManager.Get(ctx).deleteIndex(ids);

  ctx.set('cache-control', 'no-cache')
  ctx.body =  JSON.stringify(ids)
  ctx.status = 200
}

export class BlockManager{
  static KEY_TABLE_A = "UxGj6";

  constructor(public ctx: Context){}

  static Get(ctx: Context){
    return new BlockManager(ctx);
  }

  async getIndexAll(){
    return await this.ctx.clients.vbase.getJSON<TableA>(BlockManager.KEY_TABLE_A, "INDEX", true) || [];
  }

  async saveIndexAll(list: TableA){
    await this.ctx.clients.vbase.saveJSON<TableA>(BlockManager.KEY_TABLE_A, "INDEX", list);
  }

  async pushIndex(ids:TableA){
    const list = await this.getIndexAll();
    list.unshift(...ids.filter(id => list.findIndex(id2 => id2 === id) === -1));
    await this.saveIndexAll(list);
  }

  async deleteIndex(ids:TableA){
    const list = await this.getIndexAll();
    ids.forEach(id2 => list.splice(list.findIndex(id=> id === id2), 1));
    await this.saveIndexAll(list);;
  }
}
