
import { ActionClone, TaskManager, TaskNames } from "../utils/tasks";

export async function cloneCollection(ctx: Context, next: () => Promise<any>) {
  try{
    const id : string = ctx.url.split("/")[ctx.url.split("/").length-1];

    const tasks = TaskManager.GetTaskManager(ctx);
    const action = await tasks.push<ActionClone>(TaskNames.CLONE, { id });
    tasks.run_next();
    // const newCollection = await collection.cloneCollection(id);

    ctx.body = JSON.stringify(action);

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
